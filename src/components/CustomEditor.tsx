import type { ColorPalette, ColorLevel } from '../constants/Theme';

interface CustomEditorProps {
  colors: ColorPalette;
  onChangeColor: (index: ColorLevel, newColor: string) => void;
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
          <span className="pr-2 font-mono text-[13px] text-[#57606A]">{color.toUpperCase()}</span>
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
