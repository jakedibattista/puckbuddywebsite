// Protects legacy Apple style dimensions, capture names and supported titles without duplicating renderer logic.
import {expect,it} from 'vitest';
import {storeScreenshotDesigns} from '../scripts/lib/store-screenshot-designs.mjs';
it.each(['light','bold']as const)('retains the %s catalog, geometry and style-specific SVGs',variant=>{
  const design=storeScreenshotDesigns(variant);expect(design.directory).toBe(variant==='light'?'app-store':'app-store-bold');
  expect(design.config).toMatchObject({width:1284,height:2778,padding:80,phoneTopMargin:400,statusBarCrop:140,frameBorder:20,cornerRadius:80});
  expect(design.images.map(item=>[item.id,item.file])).toEqual([['01_home','v2-home.png'],['03_scorecard','v2-scorecard.png'],['04_feedback','v2-coach-feedback.png'],['05_chat','v2-chat.png'],['06_stats','v2-stats.png']]);
  expect(design.images[1].title).toEqual(['Review Your','AI Feedback']);expect(JSON.stringify(design.images)).not.toMatch(/instant|seconds/i);
  const svgs=[design.background(1284,2778),design.text(1284,2778,['Fixture title','Second line'],design.config),design.frame(1124,2200,design.config)];
  for(const svg of svgs)expect(new DOMParser().parseFromString(svg,'image/svg+xml').querySelector('parsererror')).toBeNull();
  const text=new DOMParser().parseFromString(svgs[1],'image/svg+xml');expect([...text.querySelectorAll('text')].map(node=>[node.textContent,node.getAttribute('y'),node.getAttribute('fill')])).toEqual([['Fixture title','220',design.config.textColor],['Second line','340',design.config.textColor]]);
  expect(svgs[0]).toContain(variant==='light'?'bgGradient':'blueGlow');expect(svgs[2].includes('frameShadow')).toBe(variant==='bold');
});
it('returns independent configurations and title arrays',()=>{
  const first=storeScreenshotDesigns('light');first.config.width=1;first.images[0].title[0]='Changed';
  const next=storeScreenshotDesigns('light');expect(next.config.width).toBe(1284);expect(next.images[0].title).toEqual(['Your Personal','AI Hockey Coach']);
});
it.each(['unknown','toString'])('rejects the unknown style %s before planning',variant=>{expect(()=>storeScreenshotDesigns(variant as never)).toThrow('Unknown store screenshot style');});
