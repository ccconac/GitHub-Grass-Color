interface FooterProps {
  onReset: () => void;
  onApply: () => void;
}

export function Footer({ onReset, onApply }: FooterProps) {
  return (
    <footer className="flex gap-2.5 rounded-b-xl border-t border-[#e1e4e8] bg-[#fafafa] px-5 py-4">
      <button
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-[#e1e4e8] bg-white text-[#24292f] transition-colors hover:bg-gray-50"
        onClick={onReset}
        title="초기화"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
        </svg>
      </button>
      <button
        className="h-11 flex-1 cursor-pointer rounded-lg bg-[#1f2328] text-sm font-semibold text-white transition-opacity hover:opacity-90"
        onClick={onApply}
      >
        잔디 색상 적용하기
      </button>
    </footer>
  );
}
