# 깃허브 잔디 색상 변경 익스텐션(GitHub Grass Color)

> GitHub 잔디의 색상을 자유롭게 커스터마이징할 수 있는 Chrome 확장 프로그램입니다.

<img width="1281" height="800" alt="스크린샷 2026-03-24 오전 9 10 03" src="https://github.com/user-attachments/assets/22e12b6a-9134-4dd0-bdb0-648cb14f1175" />
<p align="center">
  <a href="https://chromewebstore.google.com/detail/github-grass-color/jndomjpnidfiipnmlboeefknognjalnk?hl=ko&utm_source=ext_sidebar">
    → 확장 프로그램 바로가기
  </a>
</p>

## 기능 소개 

- 커스텀 없이 기본으로 사용할 수 있는 5가지 테마를 제공합니다.
- Level 0(기여 없음) ~ Level 4(최다 기여)까지 각 단계의 색상을 직접 지정할 수 있습니다.
- 색상을 변경할 때마다 미리 보기를 통해 적용된 색상을 실시간으로 확인할 수 있습니다.

<br />

## 🚀 사용 방법

1. Chrome 확장 프로그램을 설치합니다.
2. GitHub 페이지에 접속합니다.
3. Chrome 툴바에서 확장 프로그램 아이콘을 클릭합니다.
4. **프리셋** 탭에서 원하는 테마를 선택하거나, **커스텀** 탭에서 색상을 직접 지정합니다.
5. **적용** 버튼을 누르면 잔디 색상이 즉시 변경됩니다.
6. 기본값으로 되돌리려면 **초기화** 버튼을 클릭합니다.

<br />

## 미리 보기

### 테마 프리셋 적용 

![grass](https://github.com/user-attachments/assets/91491ac5-8bfc-4acc-9c06-9c7478d129fe)

### 커스텀 색상 적용

![custom](https://github.com/user-attachments/assets/9156c215-187b-4677-a956-9c15ac6cd66d)

<br />

## 🏗️ 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 19 |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| 빌드 도구 | Vite + @crxjs/vite-plugin |
| 확장 프로그램 | Chrome Extension Manifest V3 |

<br />

## 📁 프로젝트 구조

```
src/
├── main.tsx              # 팝업 진입점
├── App.tsx               # 팝업 루트 컴포넌트
├── content.ts            # GitHub 페이지에 주입되는 콘텐츠 스크립트
├── constants/
│   ├── Theme.ts          # ColorPalette 타입, 프리셋 테마 정의
│   └── StorageKeys.ts    # chrome.storage 키 상수
├── services/
│   └── Storage.ts        # chrome.storage.local 추상화
├── hooks/
│   └── useColorState.ts  # 색상 상태 관리 커스텀 훅
└── components/
    ├── Preview.tsx        # 잔디 미리보기 컴포넌트
    ├── PresetList.tsx     # 프리셋 목록 UI
    ├── CustomEditor.tsx   # 커스텀 색상 편집 UI
    └── ...
```
