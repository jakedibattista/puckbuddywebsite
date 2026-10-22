// Verifies Lite CLI success requires acknowledged paths and failures produce an unsuccessful command status.
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
const io=vi.hoisted(()=>({generate:vi.fn()}));
vi.mock('../scripts/lib/lite-screenshots.mjs',()=>({generateLiteScreenshots:io.generate}));
let previous:typeof process.exitCode;
beforeEach(()=>{previous=process.exitCode;process.exitCode=undefined;vi.resetModules();io.generate.mockReset();vi.spyOn(console,'log').mockImplementation(()=>{});vi.spyOn(console,'error').mockImplementation(()=>{});});
afterEach(()=>{process.exitCode=previous;vi.restoreAllMocks();});
it('prints actual acknowledged paths only after all output succeeds',async()=>{io.generate.mockResolvedValue(['/review/iphone.png','/review/ipad.png']);await import('../scripts/generate-app-store-lite.mjs');await vi.dynamicImportSettled();expect(io.generate).toHaveBeenCalledExactlyOnceWith();expect(vi.mocked(console.log).mock.calls).toEqual([['Generated Lite Apple artwork drafts:'],['/review/iphone.png'],['/review/ipad.png']]);expect(console.error).not.toHaveBeenCalled();expect(process.exitCode).toBeUndefined();});
it('reports failure without printing completion or saved paths',async()=>{const failure=Error('render denied');io.generate.mockRejectedValue(failure);await import('../scripts/generate-app-store-lite.mjs');await vi.dynamicImportSettled();expect(process.exitCode).toBe(1);expect(console.error).toHaveBeenCalledExactlyOnceWith(failure);expect(console.log).not.toHaveBeenCalled();});
