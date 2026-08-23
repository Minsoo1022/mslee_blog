# Minsu Lee — Personal Site

개인 홈페이지. 자산관리(Assets)를 포함해 Home / Assets / Insights / Career / Life
5개 섹션으로 구성.

- Stack: React + Vite + TypeScript + pnpm
- Chart: recharts
- Routing: react-router-dom (`HashRouter`)
- 디자인 톤: Etihad Airways 참고 — 골드(#C4921B) 포인트 + 플럼블랙(#251019) +
  아이보리(#FCFBF5) 배경, 제목은 Playfair Display, 본문은 Inter. 색상/폰트는
  [src/index.css](src/index.css) 상단 `:root` 토큰만 바꾸면 전체 톤이 바뀝니다.
- 배포: GitHub Pages + GitHub Actions (`.github/workflows/deploy.yml`, `main` push 시 자동 배포)

## 개발

```bash
pnpm install
pnpm dev
```

## 페이지

- **Home** (`/`) — 인트로 + 총자산 요약 + 각 섹션 최신 카드 미리보기
- **Assets** (`/assets`) — 계좌별 현황, 월별 총자산 추이, ISA 포트폴리오
  구성, 위험자산 vs 안전자산 게이지, 종목별 수익률
- **Insights** (`/insights`) — 카드뉴스 + 태그 필터(경제/부동산/주식/AI/건강 등)
- **Career** (`/career`) — 인생 로드맵 타임라인, 졸업 D-day, 체크리스트,
  연구/커리어 카드뉴스
- **Life** (`/life`) — 카드뉴스(여행/운동/기타)

## 데이터 구조

### Assets — `src/data/assets/YYYY-MM.json`

파일을 추가하면 [src/lib/loadAssets.ts](src/lib/loadAssets.ts)가
`import.meta.glob`으로 전부 자동 로드해 Home/Assets에 반영합니다 (코드 수정 불필요).

```jsonc
{
  "date": "2026-05-24",
  "totalAssets": 109681631,
  "accounts": [
    { "name": "ISA 계좌 (한투)", "amount": 54545947, "note": "투자 + 예수금" }
  ],
  "isaPortfolio": [
    { "name": "TIGER 미국30년국채커버드콜액티브", "amount": 19182555, "returnPct": -4.12, "type": "안전자산" }
  ],
  "isaCash": 5694197
}
```

**위험자산 비중** = `위험자산 합계 / (위험자산 합계 + 안전자산 합계) × 100`
(예수금 `isaCash`는 제외). 목표 70%, 허용범위 65~75% —
65% 미만이면 "위험자산 매수 필요", 75% 초과면 "일부 매도 필요"
(`src/lib/loadAssets.ts`의 `getRiskRatio`).

### Insights / Career / Life — `src/data/cards/{insights|career|life}.json`

```jsonc
{ "id": "...", "date": "YYYY-MM-DD", "title": "...", "tags": ["경제"], "summary": "...", "body": "...", "link": "..." }
```

세 섹션 모두 `CardGrid` / `CardItem` / `TagFilter` 컴포넌트를 공유하고
태그 체계만 섹션별로 다르게 갑니다.

### Career 로드맵/체크리스트 — `src/data/careerConfig.ts`

인생 로드맵 4단계, 졸업 목표일(`graduationDate`), 체크리스트는 카드가 아니라
이 파일에서 관리합니다. **`graduationDate`는 실제 졸업 목표일을 몰라서
임시값(2029-02-28)이 들어가 있으니 확정되면 이 값만 수정하면 됩니다.**

## 업데이트 워크플로우

- **Assets**: 격주/매달 증권 앱 스크린샷을 주면 잔액·수익률만 읽어서
  (계좌번호·개인정보는 저장 금지) 새 `YYYY-MM.json` 추가 → 그래프 자동 반영
- **Insights/Career/Life**: "이런 내용 카드로 추가해줘"라고 텍스트로 요청하면
  해당 섹션 JSON에 카드 추가

### 커밋 전 민감정보 체크리스트

- [ ] `src/data/**` 어디에도 계좌번호, 주민등록번호, 실명, 전화번호, 주소가 없는가
- [ ] 스크린샷 원본 이미지 파일이 저장소에 커밋되지 않았는가
- [ ] 계좌 항목이 실제 계좌번호가 아니라 종류 라벨(`ISA 계좌 (한투)` 등)인가

## 배포

- 저장소: public
- `main` push 시 `.github/workflows/deploy.yml`이 자동 빌드 후 GitHub Pages 배포
- GitHub repo Settings → Pages → Build and deployment → Source를
  **GitHub Actions**로 설정 필요

## 현재 상태

5개 섹션 기본 틀 + 내비게이션 + 디자인 시스템 + Assets 실데이터(2026-05-24 기준)로
구조를 잡은 초안. Insights/Career/Life는 더미 카드 1~2개로 레이아웃만 확인.
