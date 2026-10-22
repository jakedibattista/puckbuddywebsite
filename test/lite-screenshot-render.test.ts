// Exercises Lite crop/frame composition and both panorama slices using synthetic pixels without filesystem or customer media.
import sharp from 'sharp';import {expect,it} from 'vitest';
import {liteScreenshotDesigns} from '../scripts/lib/lite-screenshot-designs.mjs';
import {renderLiteScreen,renderLitePanorama} from '../scripts/lib/lite-screenshot-render.mjs';
async function capture(){return sharp(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="180"><rect width="80" height="180" fill="rgb(20,40,200)"/><rect width="80" height="20" fill="rgb(220,20,20)"/></svg>')).png().toBuffer();}
function config(){return {...liteScreenshotDesigns()[0].config,width:160,height:400,frameBorder:2,cornerRadius:8,fontSize:12,panoramaFontSize:12,panoramaHeight:250,panoramaOffset:20,screenHeight:200,screenOffset:10};}
it.each([0,20])('keeps source pixels/crop, centered position, frame and dimensions with top crop %s',async cropTop=>{
  const bytes=await capture(),before=Buffer.from(bytes),c=config();const output=await renderLiteScreen(bytes,{title:['Fixture','Caption'],cropTop},c);expect(await sharp(output).metadata()).toMatchObject({format:'png',width:160,height:400});
  const raw=await sharp(output).ensureAlpha().raw().toBuffer();const pixel=(x:number,y:number)=>[...raw.subarray((y*160+x)*4,(y*160+x)*4+3)];
  expect(pixel(80,109)).toEqual([51,51,51]);expect(pixel(80,112)).toEqual(cropTop?[20,40,200]:[220,20,20]);expect(pixel(80,280)).toEqual([20,40,200]);expect(bytes.equals(before)).toBe(true);
});
it('returns both panorama halves with distinct content and unchanged inputs',async()=>{const bytes=await capture(),before=Buffer.from(bytes);const outputs=await renderLitePanorama(bytes,0,config());expect(outputs).toHaveLength(2);for(const output of outputs){expect(await sharp(output).metadata()).toMatchObject({format:'png',width:160,height:400});expect((await sharp(output).stats()).channels[2].max).toBe(255);}expect(outputs[0].equals(outputs[1])).toBe(false);expect(bytes.equals(before)).toBe(true);});
it.each(['corrupt','crop beyond source'])('propagates %s rendering failure',async kind=>{const bytes=kind==='corrupt'?Buffer.from('broken'):await capture();const failure=await renderLiteScreen(bytes,{title:[],cropTop:kind==='corrupt'?0:999},config()).catch((e:Error)=>e);expect(failure).toBeInstanceOf(Error);});
