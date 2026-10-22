// Checks the social command delegates once and reports only acknowledged output paths or a visible failure.
import path from 'node:path';
import { afterEach,beforeEach,expect,it,vi } from 'vitest';
const io=vi.hoisted(()=>({write:vi.fn(),plan:[{name:'fixture',width:16,height:20,svg:'synthetic'}]}));
vi.mock('../scripts/lib/image-exports.mjs',()=>({writeSvgExports:io.write}));
vi.mock('../scripts/lib/social-banner-designs.mjs',()=>({socialBannerDesigns:()=>io.plan}));
let previous:typeof process.exitCode;
beforeEach(()=>{previous=process.exitCode;process.exitCode=undefined;vi.resetModules();io.write.mockReset();vi.spyOn(console,'log').mockImplementation(()=>{});vi.spyOn(console,'error').mockImplementation(()=>{});});
afterEach(()=>{process.exitCode=previous;vi.restoreAllMocks();});
it('prints actual saved paths after export completion',async()=>{
  io.write.mockResolvedValue(['/synthetic/banner.svg','/synthetic/banner.png']);await import('../scripts/generate-social-banners.mjs');await vi.dynamicImportSettled();
  expect(io.write).toHaveBeenCalledExactlyOnceWith(io.plan,path.join(process.cwd(),'marketing-assets','social'));
  expect(vi.mocked(console.log).mock.calls).toEqual([['Generated social-banner drafts:'],['/synthetic/banner.svg'],['/synthetic/banner.png']]);expect(process.exitCode).toBeUndefined();expect(console.error).not.toHaveBeenCalled();
});
it('fails without announcing generated files when export rejects',async()=>{
  const error=Error('synthetic export failed');io.write.mockRejectedValue(error);await import('../scripts/generate-social-banners.mjs');await vi.dynamicImportSettled();
  expect(process.exitCode).toBe(1);expect(console.error).toHaveBeenCalledExactlyOnceWith(error);expect(console.log).not.toHaveBeenCalled();
});
