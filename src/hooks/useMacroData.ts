import { macroData } from '../mock/macroData';
import type { MacroData } from '../types/macro';

export function useMacroData(): { data: MacroData; loading: boolean } {
  return { data: macroData, loading: false };
}
