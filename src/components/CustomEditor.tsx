import { useEffect, useState } from 'react';
import type { ColorPalette, ColorLevel } from '../constants/Theme';

interface CustomEditorProps {
  colors: ColorPalette;
  onChangeColor: (index: ColorLevel, newColor: string) => void;
}

interface HexColorInputProps {
  color: string;
  level: ColorLevel;
  onChangeColor: (index: ColorLevel, newColor: string) => void;
}

const HEX_COLOR_PATTERN = /^#[0-9A-F]{6}$/i;

function formatHexInput(value: string) {
  const hex = value
    .replace(/^#/, '')
    .replace(/[^0-9A-Fa-f]/g, '')
    .slice(0, 6);

  return `#${hex.toUpperCase()}`;
}

function HexColorInput({ color, level, onChangeColor }: HexColorInputProps) {
  const [draftColor, setDraftColor] = useState(color.toUpperCase());

  useEffect(() => {
    setDraftColor(color.toUpperCase());
  }, [color]);

  const handleTextChange = (value: string) => {
    const nextColor = formatHexInput(value);

    setDraftColor(nextColor);

    if (HEX_COLOR_PATTERN.test(nextColor)) {
      onChangeColor(level, nextColor);
    }
  };

  return (
    <input
      type="text"
      value={draftColor}
      onChange={(e) => handleTextChange(e.target.value)}
      onBlur={() => setDraftColor(color.toUpperCase())}
      aria-label={`Level ${level} HEX color`}
      inputMode="text"
      spellCheck={false}
      maxLength={7}
      className="mr-2 w-22 rounded-md border border-transparent bg-transparent px-1.5 py-1 text-right font-mono text-[13px] text-[#57606A] transition-colors outline-none focus:border-[#0969DA] focus:bg-white focus:text-[#24292F]"
    />
  );
}

export function CustomEditor({ colors, onChangeColor }: CustomEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs leading-relaxed text-[#57606A]">
        각 기여도 단계별로 색상을 직접 선택하세요. 왼쪽이 기여 없음(0), 오른쪽이 기여도 가장
        높음(4)입니다.
      </p>

      {colors.map((color, index) => (
        <div
          key={index}
          className="flex items-center rounded-lg border border-[#E1E4E8] bg-white px-4 py-3"
        >
          <span className="flex-1 text-sm font-medium text-[#24292F]">Level {index}</span>
          <HexColorInput color={color} level={index as ColorLevel} onChangeColor={onChangeColor} />
          <label
            className="relative h-7 w-7 cursor-pointer overflow-hidden rounded-md border border-black/10"
            style={{ backgroundColor: color }}
          >
            <input
              type="color"
              value={color}
              onChange={(e) => onChangeColor(index as ColorLevel, e.target.value)}
              className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>
      ))}
    </div>
  );
}
