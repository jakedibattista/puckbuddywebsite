// Protects established social sizes/layout boundaries and the shared supported marketing copy.
import { expect,it } from 'vitest';
import { socialBannerDesigns } from '../scripts/lib/social-banner-designs.mjs';
it('retains the three named SVG designs and their exact output dimensions',()=>{
  const plans=socialBannerDesigns();expect(plans.map(({name,width,height})=>({name,width,height}))).toEqual([
    {name:'youtube-banner',width:2560,height:1440},{name:'facebook-cover',width:1640,height:624},{name:'og-image',width:1200,height:630},
  ]);
  for(const plan of plans){
    const document=new DOMParser().parseFromString(plan.svg,'image/svg+xml');expect(document.querySelector('parsererror')).toBeNull();
    const svg=document.documentElement;expect(svg.getAttribute('width')).toBe(String(plan.width));expect(svg.getAttribute('height')).toBe(String(plan.height));expect(svg.getAttribute('viewBox')).toBe(`0 0 ${plan.width} ${plan.height}`);
    const text=[...document.querySelectorAll('text')].map(node=>node.textContent?.trim());
    expect(text).toEqual(['PUCK BUDDY','AI hockey feedback','Meet Your New','Private Hockey Coach','Upload a shot. Review scorecards + coaching feedback.']);
    expect(plan.svg).not.toMatch(/instant|rink-tested/i);
  }
});
it('returns fresh plans and retains the original platform-specific headline positions',()=>{
  const first=socialBannerDesigns();first[0].name='edited';expect(socialBannerDesigns()[0].name).toBe('youtube-banner');
  expect(socialBannerDesigns().map(plan=>{
    const document=new DOMParser().parseFromString(plan.svg,'image/svg+xml');const headline=[...document.querySelectorAll('text')].find(node=>node.textContent==='Private Hockey Coach')!;return [headline.getAttribute('x'),headline.getAttribute('y')];
  })).toEqual([['507','761'],['96','390'],['72','374']]);
});
