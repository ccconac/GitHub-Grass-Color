import { PRESET_THEMES } from '../constants/Theme';
import type { PresetThemeId } from '../constants/Theme';

interface PresetListProps {
  selectedId: PresetThemeId;
  onSelect: (id: PresetThemeId) => void;
}

export function PresetList({ selectedId, onSelect }: PresetListProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {PRESET_THEMES.map((theme) => {
        const isActive = selectedId === theme.id;

        return (
          <button
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            className={`flex cursor-pointer items-center justify-between rounded-lg bg-white transition-all duration-200 ${
              isActive
                ? 'border-2 border-[#1F2328] px-3.75 py-2.75'
                : 'border border-[#E1E4E8] px-4 py-3'
            }`}
          >
            <span className="text-sm font-medium text-[#24292F]">{theme.name}</span>
            <div className="flex gap-1">
              {theme.colors.map((color, i) => (
                <div key={i} className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
