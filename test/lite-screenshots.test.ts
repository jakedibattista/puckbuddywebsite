// Checks all Lite source capture precedes output acquisition and both device sets share one publication plan.
import fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
const io=vi.hoisted(()=>({panorama:vi.fn(),screen:vi.fn(),publish:vi.fn()}));
vi.mock('../scripts/lib/lite-screenshot-render.mjs',()=>({renderLitePanorama:io.panorama,renderLiteScreen:io.screen}));
vi.mock('../scripts/lib/image-exports.mjs',()=>({writeRasterExports:io.publish}));
import {generateLiteScreenshots} from '../scripts/lib/lite-screenshots.mjs';
import {liteScreenshotDesigns} from '../scripts/lib/lite-screenshot-designs.mjs';
let root:string;
beforeEach(async()=>{root=await fs.mkdtemp(path.join(os.tmpdir(),'lite-plans-'));await fs.mkdir(path.join(root,'public'));io.panorama.mockReset().mockImplementation(async(_b,_crop,config)=>[Buffer.from('left '+config.width),Buffer.from('right '+config.width)]);io.screen.mockReset().mockImplementation(async(_b,item)=>Buffer.from(item.id));io.publish.mockReset();for(const device of liteScreenshotDesigns())for(const item of [device.panorama,...device.images])await fs.writeFile(path.join(root,'public',item.file),'source '+item.file);});
afterEach(async()=>{vi.restoreAllMocks();await fs.rm(root,{recursive:true,force:true});});
it('captures seven unique inputs, preserves all sixteen bindings and renders each panorama once',async()=>{
  const read=vi.spyOn(fs,'readFile');const devices=liteScreenshotDesigns();
  io.publish.mockImplementation(async(jobs:Array<{name:string,directory:string,width:number,height:number,render:()=>Promise<Buffer>}>,output:string)=>{
    expect(read).toHaveBeenCalledTimes(7);expect(io.panorama).not.toHaveBeenCalled();expect(io.screen).not.toHaveBeenCalled();
    await fs.rm(path.join(root,'public'),{recursive:true});
    expect(jobs.map(j=>[j.directory,j.name,j.width,j.height])).toEqual(devices.flatMap(d=>['01_split_left','02_split_right',...d.images.map(i=>i.id.slice(d.prefix.length))].map(id=>[d.directory,d.prefix+id,d.config.width,d.config.height])));
    for(const[dIndex,d]of devices.entries())for(let side=0;side<2;side++)expect((await jobs[dIndex*8+side].render()).toString()).toBe((side?'right ':'left ')+d.config.width);
    for(const[dIndex,d]of devices.entries())for(const[index,item]of d.images.entries())expect((await jobs[dIndex*8+2+index].render()).toString()).toBe(item.id);
    expect(io.panorama).toHaveBeenCalledTimes(2);expect(io.screen).toHaveBeenCalledTimes(12);
    return jobs.map(j=>path.join(output,j.directory,j.name+'.png'));
  });
  const outputs=await generateLiteScreenshots({root});expect(outputs).toHaveLength(16);expect(outputs[0]).toBe(path.join(root,'marketing-assets/app-store-iphone-lite/01_split_left.png'));expect(outputs[15]).toBe(path.join(root,'marketing-assets/app-store-ipad-lite/ipad_08_challenge.png'));
  for(const[bytes,crop,config]of io.panorama.mock.calls){expect(bytes).toBeInstanceOf(Buffer);expect(bytes.toString()).toBe('source scorecard1.9.png');expect(crop).toBe(0);expect([1284,2048]).toContain(config.width);}
  for(const[bytes,item,config]of io.screen.mock.calls){expect(bytes).toBeInstanceOf(Buffer);expect(bytes.toString()).toBe('source '+item.file);expect(config.width).toBe(item.id.startsWith('ipad_')?2048:1284);}
});
it('supports current-directory defaults and an explicit review output',async()=>{vi.spyOn(process,'cwd').mockReturnValue(root);io.publish.mockResolvedValue(['/review/saved.png']);expect(await generateLiteScreenshots({outputRoot:path.join(root,'review')})).toEqual(['/review/saved.png']);expect(io.publish.mock.calls[0][1]).toBe(path.join(root,'review'));});
it('does not acquire outputs or render when the last source is missing',async()=>{await fs.rm(path.join(root,'public/scoreboard1.9.png'));const failure=await generateLiteScreenshots({root}).catch((e:Error)=>e);expect(failure).toBeInstanceOf(Error);expect(io.publish).not.toHaveBeenCalled();expect(io.panorama).not.toHaveBeenCalled();expect(io.screen).not.toHaveBeenCalled();expect(await fs.readFile(path.join(root,'public/home1.9.png'),'utf8')).toBe('source home1.9.png');});
it('propagates publication and lazy renderer errors',async()=>{
  const failure=Error('publisher denied');io.publish.mockRejectedValueOnce(failure);expect(await generateLiteScreenshots({root}).catch((e:Error)=>e)).toBe(failure);
  io.publish.mockImplementation(async jobs=>{await jobs[0].render();});io.panorama.mockRejectedValueOnce(failure);expect(await generateLiteScreenshots({root}).catch((e:Error)=>e)).toBe(failure);
});
