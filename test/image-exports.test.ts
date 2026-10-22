// Exercises staged image export and real PNG decoding with disposable synthetic SVGs.
// Failures must preserve previous drafts; individual publication renames can still leave a partial batch.
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { verifyPng, writeSvgExports, writeRasterExports } from '../scripts/lib/image-exports.mjs';
type Design = Parameters<typeof writeSvgExports>[0][number];
let root: string;
const designs = (): Design[] => ['one','two'].map(name => ({ name, width:16, height:20, svg:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20"><rect width="16" height="20" fill="#123456"/></svg>' }));
beforeEach(async () => { root=await fs.mkdtemp(path.join(os.tmpdir(),'social-exports-'));for (const name of ['one','two']) for(const extension of ['svg','png']) await fs.writeFile(path.join(root,`${name}.${extension}`),'old draft'); });
afterEach(async () => { vi.restoreAllMocks();await fs.rm(root,{recursive:true,force:true}); });
async function preserved() {
  for(const name of ['one','two'])for(const extension of ['svg','png']){const file=path.join(root,`${name}.${extension}`);expect(await fs.access(file).then(()=>true,()=>false)).toBe(true);expect(await fs.readFile(file,'utf8')).toBe('old draft');}
  expect((await fs.readdir(root)).filter(name=>name.startsWith('.image-exports-'))).toEqual([]);
}
it('renders and decodes every staged PNG before publishing the acknowledged SVG/PNG paths',async()=>{
  const rename=fs.rename.bind(fs);let writes=0;
  vi.spyOn(fs,'rename').mockImplementation(async(from,to)=>{
    if(!writes++)await preservedBeforePublish();await rename(from,to);
  });
  async function preservedBeforePublish(){for(const name of ['one','two'])for(const ext of ['svg','png'])expect(await fs.readFile(path.join(root,`${name}.${ext}`),'utf8')).toBe('old draft');}
  const plan=designs(),outputs=await writeSvgExports(plan,root);
  expect(outputs).toEqual(['one.svg','one.png','two.svg','two.png'].map(name=>path.join(root,name)));
  expect(writes).toBe(4);
  for(const design of plan){
    expect(await fs.readFile(path.join(root,`${design.name}.svg`),'utf8')).toBe(design.svg);
    const image=sharp(path.join(root,`${design.name}.png`));expect(await image.metadata()).toMatchObject({format:'png',width:16,height:20});
    expect((await image.stats()).channels.slice(0,3).map(channel=>channel.mean)).toEqual([18,52,86]);
  }
  expect((await fs.readdir(root)).filter(name=>name.startsWith('.image-exports-'))).toEqual([]);
});
it.each(['empty','duplicate','path','missing name','empty SVG','nonstring SVG','zero width','fractional width','zero height','infinite height'])('rejects %s designs before file acquisition',async fault=>{
  const plan=designs();
  if(fault==='empty')plan.length=0;
  if(fault==='duplicate')plan[1].name=plan[0].name;
  if(fault==='path')plan[0].name='../outside';
  if(fault==='missing name')Reflect.deleteProperty(plan[0],'name');
  if(fault==='empty SVG')plan[0].svg='  ';
  if(fault==='nonstring SVG')plan[0].svg=42 as unknown as string;
  if(fault==='zero width')plan[0].width=0;
  if(fault==='fractional width')plan[0].width=1.5;
  if(fault==='zero height')plan[0].height=0;
  if(fault==='infinite height')plan[0].height=Infinity;
  const acquire=vi.spyOn(fs,'mkdir');const outcome=await writeSvgExports(plan,root).catch((error:Error)=>error);
  expect(outcome).toBeInstanceOf(Error);expect(acquire).not.toHaveBeenCalled();await preserved();
});
it.each(['SVG write','render','PNG read','header','decode'])('preserves old exports and cleans staging after %s failure',async fault=>{
  const plan=designs();
  if(fault==='SVG write')vi.spyOn(fs,'writeFile').mockRejectedValueOnce(Error('write denied'));
  if(fault==='render')plan[1].svg='<not valid svg';
  if(fault==='PNG read')vi.spyOn(fs,'readFile').mockRejectedValueOnce(Error('read denied'));
  if(fault==='header')vi.spyOn(fs,'readFile').mockResolvedValueOnce(Buffer.from('broken image'));
  if(fault==='decode'){
    const bytes=Buffer.alloc(24);Buffer.from([137,80,78,71,13,10,26,10]).copy(bytes);bytes.write('IHDR',12);bytes.writeUInt32BE(16,16);bytes.writeUInt32BE(20,20);
    vi.spyOn(fs,'readFile').mockResolvedValueOnce(bytes);
  }
  const outcome=await writeSvgExports(plan,root).catch((error:Error)=>error);expect(outcome).toBeInstanceOf(Error);await preserved();
});
it('reports an individual publication failure without pretending the batch is atomic',async()=>{
  const rename=fs.rename.bind(fs);let count=0;
  vi.spyOn(fs,'rename').mockImplementation(async(from,to)=>{if(++count===3)throw Error('publish denied');await rename(from,to);});
  const outcome=await writeSvgExports(designs(),root).catch((error:Error)=>error);expect(outcome).toMatchObject({message:'publish denied'});
  expect(await fs.readFile(path.join(root,'one.svg'),'utf8')).toContain('<svg');expect(await fs.readFile(path.join(root,'two.svg'),'utf8')).toBe('old draft');
  expect((await fs.readdir(root)).filter(name=>name.startsWith('.image-exports-'))).toEqual([]);
});
it.each([false,true])('reports cleanup failure and retains an earlier render failure: %s',async earlier=>{
  const plan=designs();if(earlier)plan[0].svg='broken SVG';vi.spyOn(fs,'rm').mockRejectedValueOnce(Error('cleanup denied'));
  const outcome=await writeSvgExports(plan,root).catch((error:Error)=>error);
  if(earlier){expect(outcome).toBeInstanceOf(AggregateError);expect((outcome as AggregateError).errors).toHaveLength(2);expect((outcome as AggregateError).errors[1]).toMatchObject({message:'cleanup denied'});}
  else expect(outcome).toMatchObject({message:'cleanup denied'});
});
it('does not render or clean up unrelated paths when directory creation fails',async()=>{
  vi.spyOn(fs,'mkdir').mockRejectedValueOnce(Error('directory denied'));const remove=vi.spyOn(fs,'rm');
  const outcome=await writeSvgExports(designs(),root).catch((error:Error)=>error);expect(outcome).toMatchObject({message:'directory denied'});expect(remove).not.toHaveBeenCalled();await preserved();
});
it.each(['short','signature','chunk','width','height'])('rejects a PNG with invalid %s',fault=>{
  const bytes=Buffer.alloc(24);Buffer.from([137,80,78,71,13,10,26,10]).copy(bytes);bytes.write('IHDR',12);bytes.writeUInt32BE(16,16);bytes.writeUInt32BE(20,20);
  if(fault==='signature')bytes[0]=0;if(fault==='chunk')bytes.write('IDAT',12);if(fault==='width')bytes.writeUInt32BE(17,16);if(fault==='height')bytes.writeUInt32BE(21,20);
  expect(()=>verifyPng(fault==='short'?bytes.subarray(0,8):bytes,{width:16,height:20})).toThrow(/PNG header|dimensions/);
});

it('publishes raster-only PNGs without replacing existing SVG drafts',async()=>{
  const bytes=await sharp({create:{width:16,height:20,channels:4,background:'#123456'}}).png().toBuffer();const render=vi.fn(async()=>bytes);
  expect(await writeRasterExports([{name:'one',width:16,height:20,render}],root)).toEqual([path.join(root,'one.png')]);expect(render).toHaveBeenCalledOnce();
  expect(await fs.readFile(path.join(root,'one.svg'),'utf8')).toBe('old draft');expect(await fs.readFile(path.join(root,'one.png'))).toEqual(bytes);
});
it.each(['missing render','nonstring SVG','empty SVG'])('rejects malformed raster planning: %s',async fault=>{
  const job={name:'one',width:16,height:20,render:async()=>Buffer.from('unused'),svg:undefined as string|undefined};
  if(fault==='missing render')Reflect.deleteProperty(job,'render');if(fault==='nonstring SVG')job.svg=42 as unknown as string;if(fault==='empty SVG')job.svg=' ';
  const acquire=vi.spyOn(fs,'mkdir');const outcome=await writeRasterExports([job],root).catch((error:Error)=>error);expect(outcome).toBeInstanceOf(Error);expect(acquire).not.toHaveBeenCalled();await preserved();
});
it('rejects an absent SVG before acquiring output files',async()=>{
  const plan=designs();Reflect.deleteProperty(plan[0],'svg');const acquire=vi.spyOn(fs,'mkdir');const outcome=await writeSvgExports(plan,root).catch((error:Error)=>error);expect(outcome).toBeInstanceOf(Error);expect(acquire).not.toHaveBeenCalled();await preserved();
});
it('preserves old drafts when a raster renderer rejects',async()=>{
  const failure=Error('render failed');const outcome=await writeRasterExports([{name:'one',width:16,height:20,render:async()=>{throw failure;}}],root).catch((error:Error)=>error);expect(outcome).toBe(failure);await preserved();
});

it.each(['../outside','nested/path','',42])('rejects unsafe or invalid output directory %s before acquisition',async directory=>{
  const acquire=vi.spyOn(fs,'mkdir');const outcome=await writeRasterExports([{name:'one',directory:directory as string,width:16,height:20,render:async()=>Buffer.from('unused')}],root).catch((e:Error)=>e);expect(outcome).toBeInstanceOf(Error);expect(acquire).not.toHaveBeenCalled();await preserved();
});
it('validates both device groups before any publication and acknowledges exact nested destinations',async()=>{
  const bytes=await sharp({create:{width:16,height:20,channels:4,background:'#123456'}}).png().toBuffer();let rendered=0;
  const rename=fs.rename.bind(fs);vi.spyOn(fs,'rename').mockImplementation(async(from,to)=>{expect(rendered).toBe(2);await rename(from,to);});
  const jobs=['iphone','ipad'].map((directory,i)=>({directory,name:['one','two'][i],width:16,height:20,render:async()=>{rendered++;return bytes;}}));
  expect(await writeRasterExports(jobs,root)).toEqual([path.join(root,'iphone/one.png'),path.join(root,'ipad/two.png')]);await preserved();
});
it('preserves both device groups when the last render or destination preparation fails',async()=>{
  const bytes=await sharp({create:{width:16,height:20,channels:4,background:'#123456'}}).png().toBuffer();const failure=Error('second device denied');
  const jobs=['iphone','ipad'].map((directory,i)=>({directory,name:['one','two'][i],width:16,height:20,render:async()=>bytes}));
  jobs[1].render=async()=>{throw failure;};expect(await writeRasterExports(jobs,root).catch((e:Error)=>e)).toBe(failure);await preserved();
  jobs[1].render=async()=>bytes;const mkdir=fs.mkdir.bind(fs);vi.spyOn(fs,'mkdir').mockImplementation(async(...args:Parameters<typeof fs.mkdir>)=>{if(String(args[0]).endsWith('/ipad'))throw failure;return mkdir(...args);});const rename=vi.spyOn(fs,'rename');
  expect(await writeRasterExports(jobs,root).catch((e:Error)=>e)).toBe(failure);expect(rename).not.toHaveBeenCalled();await preserved();
});
