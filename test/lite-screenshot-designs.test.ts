// Freezes the Lite device/output contracts and verifies each request gets independently mutable plans.
import {expect,it} from 'vitest';
import {liteScreenshotDesigns} from '../scripts/lib/lite-screenshot-designs.mjs';
it('preserves both original device geometries, source crops, titles and output names',()=>{
  const designs=liteScreenshotDesigns();
  expect(designs.map(d=>[d.directory,d.prefix,d.config])).toEqual([
    ['app-store-iphone-lite','',{width:1284,height:2778,frameColor:'#000000',frameBorder:20,cornerRadius:70,fontSize:85,panoramaFontSize:80,panoramaHeight:1900,panoramaOffset:200,screenHeight:1700,screenOffset:150}],
    ['app-store-ipad-lite','ipad_',{width:2048,height:2732,frameColor:'#000000',frameBorder:30,cornerRadius:100,fontSize:160,panoramaFontSize:160,panoramaHeight:2200,panoramaOffset:300,screenHeight:1600,screenOffset:200}],
  ]);
  const expected=[['home1.9.png',0,'03_home',['YOUR PRACTICE','COMPANION']],['v2-coach-feedback.png',140,'04_feedback',['GET DETAILED','FEEDBACK']],['v2-chat.png',140,'05_chat',['CHAT WITH A','HOCKEY EXPERT']],['stats1.5.png',140,'06_stats',['TRACK YOUR','PROGRESS']],['journal1.9.png',0,'07_journal',['REVIEW YOUR','SESSIONS']],['scoreboard1.9.png',0,'08_challenge',['COMPETE WITH','FRIENDS']]];
  for(const device of designs){expect(device.panorama).toEqual({file:'scorecard1.9.png',cropTop:0});expect(device.images.map(i=>[i.file,i.cropTop,i.id,i.title])).toEqual(expected.map(([file,crop,id,title])=>[file,crop,device.prefix+id,title]));}
});
it('keeps sibling device titles and later catalog requests independent',()=>{
  const devices=liteScreenshotDesigns();devices[0].images[0].title[0]='changed';devices[0].config.width=1;devices[0].panorama.cropTop=1;
  expect(devices[1].images[0].title[0]).toBe('YOUR PRACTICE');const fresh=liteScreenshotDesigns();expect(fresh[0].images[0].title[0]).toBe('YOUR PRACTICE');expect(fresh[0].config.width).toBe(1284);expect(fresh[0].panorama.cropTop).toBe(0);
});
