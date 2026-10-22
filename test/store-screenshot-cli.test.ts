// Verifies both Apple commands report only acknowledged paths and return failure when the shared owner rejects.
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
const io=vi.hoisted(()=>({generate:vi.fn()}));
vi.mock('../scripts/lib/store-screenshots.mjs',()=>({generateStoreScreenshots:io.generate}));
let previous:typeof process.exitCode;
beforeEach(()=>{previous=process.exitCode;process.exitCode=undefined;vi.resetModules();io.generate.mockReset();vi.spyOn(console,'log').mockImplementation(()=>{});vi.spyOn(console,'error').mockImplementation(()=>{});});
afterEach(()=>{process.exitCode=previous;vi.restoreAllMocks();});
async function command(variant:string){if(variant==='light')await import('../scripts/generate-app-store-images.mjs');else await import('../scripts/generate-app-store-bold.mjs');await vi.dynamicImportSettled();}
it.each(['light','bold'])('prints the actual acknowledged %s artwork paths',async variant=>{
  io.generate.mockResolvedValue(['/synthetic/01_home.png','/synthetic/03_scorecard.png']);await command(variant);
  expect(io.generate).toHaveBeenCalledExactlyOnceWith(variant);expect(vi.mocked(console.log).mock.calls).toEqual([['Generated Apple artwork drafts:'],['/synthetic/01_home.png'],['/synthetic/03_scorecard.png']]);expect(process.exitCode).toBeUndefined();expect(console.error).not.toHaveBeenCalled();
});
it.each(['light','bold'])('returns failure without a completion message for failed %s output',async variant=>{
  const error=Error('synthetic capture failure');io.generate.mockRejectedValue(error);await command(variant);
  expect(process.exitCode).toBe(1);expect(console.error).toHaveBeenCalledExactlyOnceWith(error);expect(console.log).not.toHaveBeenCalled();
});
