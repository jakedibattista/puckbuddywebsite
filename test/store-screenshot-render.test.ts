// Exercises actual crop/composite behavior with synthetic pixels, including the no-crop branch and invalid inputs.
import sharp from 'sharp';
import {expect,it} from 'vitest';
import {storeScreenshotDesigns} from '../scripts/lib/store-screenshot-designs.mjs';
import {renderStoreScreenshot} from '../scripts/lib/store-screenshot-render.mjs';
async function capture(){return sharp(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="180"><rect width="80" height="180" fill="rgb(20,40,200)"/><rect width="80" height="20" fill="rgb(220,20,20)"/></svg>')).png().toBuffer();}
it.each([['light',0,[220,20,20]],['light',20,[20,40,200]],['bold',0,[220,20,20]],['bold',20,[20,40,200]]]as const)('retains pixel crop/composition for %s with top crop %s',async(variant,crop,expected)=>{
  const design=storeScreenshotDesigns(variant);Object.assign(design.config,{width:96,height:300,padding:8,phoneTopMargin:-40,frameBorder:2,cornerRadius:8,statusBarCrop:crop});
  const input=await capture(),before=Buffer.from(input);const output=await renderStoreScreenshot(input,{title:['Fixture']},design);
  expect(await sharp(output).metadata()).toMatchObject({format:'png',width:96,height:300});
  const raw=await sharp(output).ensureAlpha().raw().toBuffer();const offset=(20*96+48)*4;
  expect([...raw.subarray(offset,offset+3)]).toEqual(expected);
  const border=(11*96+48)*4,firstImageRow=(12*96+48)*4;
  expect([...raw.subarray(border,border+3)]).toEqual(variant==='light'?[26,26,26]:[0,0,0]);
  expect([...raw.subarray(firstImageRow,firstImageRow+3)]).toEqual(expected);expect(input.equals(before)).toBe(true);
});
it.each(['corrupt','crop too large'])('propagates %s input failure',async failure=>{
  const design=storeScreenshotDesigns('light');if(failure==='crop too large')design.config.statusBarCrop=1000;
  const outcome=await renderStoreScreenshot(failure==='corrupt'?Buffer.from('broken PNG'):await capture(),{title:['Fixture']},design).catch((error:Error)=>error);expect(outcome).toBeInstanceOf(Error);
});
