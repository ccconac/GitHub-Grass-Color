import type { ColorPalette } from './constants/Theme';
import { STORAGE_KEYS } from './constants/StorageKeys';

const defaultColors: ColorPalette = ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'];

function isColorPalette(value: string[]): value is ColorPalette {
  return value.length === 5 && value.every((v) => /^#[0-9A-Fa-f]{6}$/.test(v));
}

const injectStyles = (colors: ColorPalette) => {
  const styleId = 'github-grass-custom-style';
  const existingStyle = document.getElementById(styleId);

  if (existingStyle) existingStyle.remove();

  const css = `
    .ContributionCalendar-day[data-level="0"], rect[data-level="0"] { fill: ${colors[0]} !important; background-color: ${colors[0]} !important; }
    .ContributionCalendar-day[data-level="1"], rect[data-level="1"] { fill: ${colors[1]} !important; background-color: ${colors[1]} !important; }
    .ContributionCalendar-day[data-level="2"], rect[data-level="2"] { fill: ${colors[2]} !important; background-color: ${colors[2]} !important; }
    .ContributionCalendar-day[data-level="3"], rect[data-level="3"] { fill: ${colors[3]} !important; background-color: ${colors[3]} !important; }
    .ContributionCalendar-day[data-level="4"], rect[data-level="4"] { fill: ${colors[4]} !important; background-color: ${colors[4]} !important; }
  `;

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = css;

  document.head.appendChild(styleElement);
};

chrome.storage.local.get([STORAGE_KEYS.SELECTED_THEME], (result) => {
  const raw = result[STORAGE_KEYS.SELECTED_THEME];
  const colors = Array.isArray(raw) && isColorPalette(raw) ? raw : defaultColors;

  injectStyles(colors);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace !== 'local' || !changes[STORAGE_KEYS.SELECTED_THEME]) return;

  const raw = changes[STORAGE_KEYS.SELECTED_THEME].newValue;
  if (Array.isArray(raw) && isColorPalette(raw)) injectStyles(raw);
});
