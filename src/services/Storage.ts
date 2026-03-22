import { TAB_MODE, PRESET_THEME_IDS } from '../constants/Theme';
import type { ColorPalette, TabMode, PresetThemeId } from '../constants/Theme';
import { STORAGE_KEYS } from '../constants/StorageKeys';

export interface AppState {
  tabMode: TabMode;
  selectedPresetId: PresetThemeId;
  customColors: ColorPalette;
}

function isTabMode(value: string): value is TabMode {
  return (Object.values(TAB_MODE) as string[]).includes(value);
}

function isPresetThemeId(value: string): value is PresetThemeId {
  return (PRESET_THEME_IDS as readonly string[]).includes(value);
}

function isColorPalette(value: string[]): value is ColorPalette {
  return value.length === 5 && value.every((v) => /^#[0-9A-Fa-f]{6}$/.test(v));
}

export const StorageService = {
  loadState: (): Promise<Partial<AppState>> => {
    return new Promise((resolve) => {
      if (typeof chrome === 'undefined' || !chrome.storage) {
        resolve({});
        return;
      }

      chrome.storage.local.get(
        [STORAGE_KEYS.TAB_MODE, STORAGE_KEYS.SELECTED_PRESET_ID, STORAGE_KEYS.CUSTOM_COLORS],
        (result) => {
          if (chrome.runtime.lastError) {
            console.error('스토리지 로드 실패:', chrome.runtime.lastError.message);
            resolve({});
            return;
          }

          const state: Partial<AppState> = {};

          const rawTabMode = result[STORAGE_KEYS.TAB_MODE];
          if (typeof rawTabMode === 'string' && isTabMode(rawTabMode)) {
            state.tabMode = rawTabMode;
          }

          const rawPresetId = result[STORAGE_KEYS.SELECTED_PRESET_ID];
          if (typeof rawPresetId === 'string' && isPresetThemeId(rawPresetId)) {
            state.selectedPresetId = rawPresetId;
          }

          const rawCustomColors = result[STORAGE_KEYS.CUSTOM_COLORS];
          if (Array.isArray(rawCustomColors) && isColorPalette(rawCustomColors)) {
            state.customColors = rawCustomColors;
          }

          resolve(state);
        },
      );
    });
  },

  applyColors: (colors: ColorPalette): void => {
    if (typeof chrome === 'undefined' || !chrome.storage) return;
    chrome.storage.local.set({ [STORAGE_KEYS.SELECTED_THEME]: colors }, () => {
      if (chrome.runtime.lastError) {
        console.error('색상 저장 실패:', chrome.runtime.lastError.message);
      }
    });
  },

  saveCurrentSession: (state: Partial<AppState>): void => {
    if (typeof chrome === 'undefined' || !chrome.storage) return;

    const data: Record<string, unknown> = {};
    if (state.tabMode !== undefined) data[STORAGE_KEYS.TAB_MODE] = state.tabMode;
    if (state.selectedPresetId !== undefined)
      data[STORAGE_KEYS.SELECTED_PRESET_ID] = state.selectedPresetId;
    if (state.customColors !== undefined) data[STORAGE_KEYS.CUSTOM_COLORS] = state.customColors;

    chrome.storage.local.set(data, () => {
      if (chrome.runtime.lastError) {
        console.error('세션 저장 실패:', chrome.runtime.lastError.message);
      }
    });
  },
};
