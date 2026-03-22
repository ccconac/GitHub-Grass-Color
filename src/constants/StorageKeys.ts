export const STORAGE_KEYS = {
  TAB_MODE: 'tabMode',
  SELECTED_PRESET_ID: 'selectedPresetId',
  CUSTOM_COLORS: 'customColors',
  SELECTED_THEME: 'selectedTheme',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
