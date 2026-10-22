// Checks both store planners read all source bytes before export acquisition and preserve exact catalog/output bindings.
import fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
const io=vi.hoisted(()=>({render:vi.fn(),publish:vi.fn()}));
vi.mock('../scripts/lib/store-screenshot-render.mjs',()=>({renderStoreScreenshot:io.render}));
vi.mock('../scripts/lib/image-exports.mjs',()=>({writeRasterExports:io.publish}));
import {generateStoreScreenshots} from '../scripts/lib/store-screenshots.mjs';
import {storeScreenshotDesigns} from '../scripts/lib/store-screenshot-designs.mjs';
let root:string;
beforeEach(async()=>{root=await fs.mkdtemp(path.join(os.tmpdir(),'apple-plans-'));await fs.mkdir(path.join(root,'public'));io.render.mockReset();io.publish.mockReset();io.render.mockResolvedValue(Buffer.from('rendered fixture'));for(const item of storeScreenshotDesigns('light').images)await fs.writeFile(path.join(root,'public',item.file),'source '+item.id);});
afterEach(async()=>{vi.restoreAllMocks();await fs.rm(root,{recursive:true,force:true});});
it.each(['light','bold']as const)('binds all original captures, dimensions and default %s destinations',async variant=>{
  const design=storeScreenshotDesigns(variant);io.publish.mockImplementation(async(jobs:Array<{name:string,width:number,height:number,render:()=>Promise<Buffer>}>,output:string)=>{
    expect(io.render).not.toHaveBeenCalled();expect(jobs.map(job=>[job.name,job.width,job.height])).toEqual(design.images.map(item=>[item.id,1284,2778]));
    // Every input was captured before any renderer or output lifecycle starts.
    for(const item of design.images)await fs.rm(path.join(root,'public',item.file));
    for(const job of jobs)expect(await job.render()).toEqual(Buffer.from('rendered fixture'));
    return jobs.map(job=>path.join(output,job.name+'.png'));
  });
  expect(await generateStoreScreenshots(variant,{root})).toEqual(design.images.map(item=>path.join(root,'marketing-assets',design.directory,item.id+'.png')));
  for(const[index,item]of design.images.entries()){const[bytes,bound,actualDesign]=io.render.mock.calls[index];expect(bytes).toBeInstanceOf(Buffer);expect(bytes.toString()).toBe('source '+item.id);expect(bound).toEqual(item);expect(actualDesign.directory).toBe(design.directory);expect(actualDesign.config).toEqual(design.config);}
});
it('honors an explicit output root and the current directory default',async()=>{
  vi.spyOn(process,'cwd').mockReturnValue(root);io.publish.mockResolvedValue(['/synthetic/acknowledged.png']);
  expect(await generateStoreScreenshots('light',{outputRoot:path.join(root,'review')})).toEqual(['/synthetic/acknowledged.png']);expect(io.publish.mock.calls[0][1]).toBe(path.join(root,'review'));
});
it('rejects a missing last input before renderer or output acquisition',async()=>{
  await fs.rm(path.join(root,'public','v2-stats.png'));const outcome=await generateStoreScreenshots('bold',{root}).catch((error:Error)=>error);expect(outcome).toBeInstanceOf(Error);expect(io.render).not.toHaveBeenCalled();expect(io.publish).not.toHaveBeenCalled();
  for(const item of storeScreenshotDesigns('light').images.slice(0,-1))expect(await fs.readFile(path.join(root,'public',item.file),'utf8')).toBe('source '+item.id);
});
it('propagates publisher failures without reporting partial success',async()=>{const failure=Error('publication denied');io.publish.mockRejectedValue(failure);expect(await generateStoreScreenshots('light',{root}).catch((error:Error)=>error)).toBe(failure);});
it('rejects an unsupported style before source reads',async()=>{const read=vi.spyOn(fs,'readFile');const outcome=await generateStoreScreenshots('unknown'as never,{root}).catch((error:Error)=>error);expect(outcome).toBeInstanceOf(Error);expect(read).not.toHaveBeenCalled();expect(io.publish).not.toHaveBeenCalled();});
