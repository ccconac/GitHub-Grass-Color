import { TabButton, Preview, PresetList, CustomEditor, Footer } from './components';
import { TAB_MODE } from './constants/Theme';
import { useColorState } from './hooks/useColorState';

export default function App() {
  const {
    tabMode,
    selectedPresetId,
    customColors,
    currentColors,
    handleTabChange,
    handlePresetSelect,
    handleCustomColorChange,
    handleReset,
    handleApply,
  } = useColorState();

  return (
    <div className="flex w-90 flex-col rounded-xl bg-white font-sans text-[#24292f] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <header className="flex items-center gap-2 border-b border-[#e1e4e8] px-5 py-4">
        <h2 className="text-base font-semibold">잔디 색상 변경</h2>
      </header>
      <div className="bg-[#fafafa] p-5">
        <Preview colors={currentColors} />
      </div>
      <div className="flex border-b border-[#e1e4e8]">
        <TabButton
          label="프리셋"
          mode={TAB_MODE.PRESET}
          isActive={tabMode === TAB_MODE.PRESET}
          onClick={() => handleTabChange(TAB_MODE.PRESET)}
        />
        <TabButton
          label="커스텀"
          mode={TAB_MODE.CUSTOM}
          isActive={tabMode === TAB_MODE.CUSTOM}
          onClick={() => handleTabChange(TAB_MODE.CUSTOM)}
        />
      </div>
      <div className="scrollbar-hide h-78 overflow-y-auto p-5">
        {tabMode === TAB_MODE.PRESET ? (
          <PresetList selectedId={selectedPresetId} onSelect={handlePresetSelect} />
        ) : (
          <CustomEditor colors={customColors} onChangeColor={handleCustomColorChange} />
        )}
      </div>
      <Footer onReset={handleReset} onApply={handleApply} />
    </div>
  );
}
