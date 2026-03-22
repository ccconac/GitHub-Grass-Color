import type { ColorPalette, ColorLevel } from '../constants/Theme';

const MOCK_GRAPH_LEVELS: readonly ColorLevel[] = [
  0, 2, 3, 1, 0, 4, 2, 1, 0, 2, 1, 0, 3, 2, 0, 1, 4, 3, 0, 1, 2, 3, 1, 2, 1, 0, 2, 1, 3, 4, 1, 2, 0,
  0, 1, 2, 0, 1, 0, 2, 1, 3, 4, 0, 0, 0, 1, 2, 0, 1, 0, 2, 1, 3,
];

interface PreviewProps {
  colors: ColorPalette;
}

export function Preview({ colors }: PreviewProps) {
  const mockGraphLevels = MOCK_GRAPH_LEVELS;

  return (
    <div>
      <span className="block pb-3 text-xs text-[#57606a]">미리보기</span>
      <div className="grid grid-cols-[repeat(18,1fr)] justify-center gap-1 pb-3">
        {mockGraphLevels.map((level, idx) => (
          <div
            key={idx}
            className="h-3.5 w-3.5 rounded-sm border border-solid border-[#1f23280d]"
            style={{ backgroundColor: colors[level] }}
          />
        ))}
      </div>
      <div className="flex items-center justify-end gap-1 text-xs text-[#57606a]">
        <span>Less</span>
        {colors.map((color, i) => (
          <div key={i} className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
