import type { TabMode } from '../constants/Theme';

interface TabButtonProps {
  label: string;
  mode: TabMode;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      className={`flex-1 cursor-pointer border-b-2 bg-transparent py-3 text-sm font-medium transition-colors ${
        isActive ? 'border-[#24292f] text-[#24292f]' : 'border-transparent text-[#57606a]'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
