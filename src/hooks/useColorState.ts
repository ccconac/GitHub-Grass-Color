import { useEffect, useRef, useState, useMemo } from 'react';
import { DEFAULT_PALETTE, TAB_MODE, PRESET_THEMES } from '../constants/Theme';
import type { ColorPalette, TabMode, PresetThemeId, ColorLevel } from '../constants/Theme';
import { StorageService } from '../services/Storage';

export function useColorState() {
  const [tabMode, setTabMode] = useState<TabMode>(TAB_MODE.PRESET);
  const [selectedPresetId, setSelectedPresetId] = useState<PresetThemeId>(PRESET_THEMES[0].id);
  const [customColors, setCustomColors] = useState<ColorPalette>(DEFAULT_PALETTE);

  const isInitialized = useRef(false);

  useEffect(() => {
    StorageService.loadState().then((state) => {
      if (state.tabMode) setTabMode(state.tabMode);
      if (state.selectedPresetId) setSelectedPresetId(state.selectedPresetId);
      if (state.customColors) setCustomColors(state.customColors);

      isInitialized.current = true;
    });
  }, []);

  useEffect(() => {
    if (!isInitialized.current) return;

    const timer = setTimeout(() => {
      StorageService.saveCurrentSession({ tabMode, selectedPresetId, customColors });
    }, 300);

    return () => clearTimeout(timer);
  }, [tabMode, selectedPresetId, customColors]);

  const currentColors = useMemo((): ColorPalette => {
    if (tabMode === TAB_MODE.PRESET) {
      return PRESET_THEMES.find((t) => t.id === selectedPresetId)?.colors ?? DEFAULT_PALETTE;
    }

    return customColors;
  }, [tabMode, selectedPresetId, customColors]);

  const handleTabChange = (mode: TabMode) => setTabMode(mode);

  const handlePresetSelect = (id: PresetThemeId) => setSelectedPresetId(id);

  const handleCustomColorChange = (index: ColorLevel, color: string) => {
    setCustomColors((prev) => {
      const updated = [...prev] as ColorPalette;
      updated[index] = color;

      return updated;
    });
  };

  const handleReset = () => {
    setTabMode(TAB_MODE.PRESET);
    setSelectedPresetId(PRESET_THEMES[0].id);
    setCustomColors(DEFAULT_PALETTE);
  };

  const handleApply = () => {
    StorageService.applyColors(currentColors);
  };

  return {
    tabMode,
    selectedPresetId,
    customColors,
    currentColors,
    handleTabChange,
    handlePresetSelect,
    handleCustomColorChange,
    handleReset,
    handleApply,
  };
}
