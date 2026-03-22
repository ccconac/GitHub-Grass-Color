export type ColorPalette = [string, string, string, string, string];

export type ColorLevel = 0 | 1 | 2 | 3 | 4;

export const TAB_MODE = {
  PRESET: 'preset',
  CUSTOM: 'custom',
} as const;
export type TabMode = (typeof TAB_MODE)[keyof typeof TAB_MODE];

export const PRESET_THEME_IDS = ['default', 'ocean', 'sunset', 'purple', 'monochrome'] as const;
export type PresetThemeId = (typeof PRESET_THEME_IDS)[number];

export interface PresetTheme {
  id: PresetThemeId;
  name: string;
  colors: ColorPalette;
}

export const PRESET_THEMES: readonly PresetTheme[] = [
  {
    id: 'default',
    name: '기본 (Default Green)',
    colors: ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'],
  },
  {
    id: 'ocean',
    name: '오션 (Ocean Blue)',
    colors: ['#EBEDF0', '#C8E1FF', '#79B8FF', '#2188FF', '#005CC5'],
  },
  {
    id: 'sunset',
    name: '선셋 (Sunset Orange)',
    colors: ['#EBEDF0', '#FFDFB6', '#FFB347', '#FF7B00', '#CC5500'],
  },
  {
    id: 'purple',
    name: '퍼플 (Purple Haze)',
    colors: ['#EBEDF0', '#E1D4FD', '#B392F0', '#8957E5', '#5A32A3'],
  },
  {
    id: 'monochrome',
    name: '모노 (Monochrome)',
    colors: ['#EBEDF0', '#D5D5D5', '#AAAAAA', '#777777', '#333333'],
  },
] as const;

export const DEFAULT_PALETTE = PRESET_THEMES[0].colors;
