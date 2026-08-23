# Minsu Lee — Personal Site

개인 홈페이지. 자산관리(Assets)를 포함해 Home / Assets / Insights / Career / Life
5개 섹션으로 구성.

- Stack: React + Vite + TypeScript + pnpm
- Chart: recharts
- Routing: react-router-dom (`HashRouter`)
- 디자인 톤: Etihad Airways 참고 — **다크가 기본, 화이트는 예외.** 기본 배경은
  네이비 그라데이션(`--color-navy` #1b2a33 → `--color-navy-light` #263942),
  기본 텍스트는 아이보리, 골드(`--color-gold` #C4921B)는 eyebrow/버튼/태그/
  내비 active/카드 hover 보더에만 포인트로. 화이트 배경(`--color-ivory`)은
  **Assets 페이지**와 **카드/프로젝트 상세 페이지의 본문 블록**(`.surface-light`)
  두 곳에만 예외적으로 사용. 카드/패널 종류별로 보더 대신 구분 방식이 다릅니다:
  사진 카드는 보더 없이 이미지가 프레임 역할, 아이콘·숫자 요약 카드는
  `--surface-fill` 배경 필채움(보더 없음, radius 16~20px), 표/리스트는 박스 없이
  행 구분선만. 표면 색은 `--surface-fill`/`--surface-border`/`--text-primary`/
  `--text-secondary` 토큰으로 간접 참조해서, `.app-content--light` 스코프
  안에서만 라이트로 뒤집힙니다. 제목은 Fraunces, 카드뉴스 제목만
  Playfair Display, 본문은 Inter. 색상/폰트는 [src/index.css](src/index.css)
  상단 `:root` 토큰만 바꾸면 전체 톤이 바뀝니다.
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
- **Career** — 상단 내비 "Career"는 호버하면 드롭다운으로 두 페이지로 갈라짐
  (`/career` 루트는 `/career/graduate`로 리다이렉트):
  - **대학원** (`/career/graduate`) — KIST 대학원 생활. 졸업 D-day, 진행 중
    프로젝트 카드, 완료 프로젝트 아코디언, 격주 연구 진행 로그 타임라인
  - **취업 준비** (`/career/job-prep`) — 인생 로드맵 타임라인, 영어/자격증
    체크리스트, 취업 준비 카드뉴스 (예전 Career 페이지 내용 그대로 이동)
- **Life** (`/life`) — 카드뉴스(여행/운동/기타)
- **카드 상세** (`/insights/:id`, `/career/job-prep/:id`, `/life/:id`) — 풀블리드
  히어로 이미지(없으면 폴백 아이콘) + 화이트 본문 카드(마크다운) + 같은 태그
  관련 카드 추천
- **프로젝트/연구 로그 상세** (`/career/graduate/project/:id`,
  `/career/graduate/log/:id`) — 화이트 본문 카드에 상세 설명, 연구 로그는
  완료한 과제/다음 계획 전체 목록 + 첨부 이미지(있으면)

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

### Insights / 취업 준비 / Life — `src/data/cards/{insights|life}.json`, `src/data/career/job-prep.json`

```jsonc
{
  "id": "...",
  "date": "YYYY-MM-DD",
  "title": "...",
  "tags": ["경제"],
  "summary": "카드 목록용 한 줄 요약",
  "image": "images/xxx.jpg", // 없으면 null → 폴백(다크 카드 + 흐린 아이콘) 적용
  "body": "상세 페이지 본문. 마크다운 가능 (굵게, 목록 등)"
}
```

세 섹션 모두 `CardGrid` / `CardItem` / `CardDetail` / `TagFilter` 컴포넌트를
공유하고 태그 체계만 섹션별로 다르게 갑니다. 카드를 클릭하면 `#/insights/:id`
같은 전용 상세 페이지로 이동합니다.

이미지는 `src/data/images/`에 파일을 넣고 JSON `image` 필드에
`"images/파일명.jpg"`처럼 상대경로만 적으면 [src/lib/loadImages.ts](src/lib/loadImages.ts)가
`import.meta.glob`으로 자동으로 찾아 연결합니다 (파일명만 일치하면 되므로
정확한 폴더 depth는 신경 쓰지 않아도 됨). 지금은 `placeholder-finance.svg`,
`placeholder-run.svg` 두 개만 데모용으로 들어가 있고, 나머지 카드는
`image: null`로 폴백 스타일(카드 hover 시 골드 보더 + 흐린 아이콘)을 보여줍니다.
저작권 있는 스톡 사진보다는 직접 찍은 사진 위주로 채우는 걸 추천합니다.

### 취업 준비 로드맵/체크리스트 — `src/data/careerConfig.ts`

인생 로드맵 4단계, 체크리스트, 졸업 목표일(`graduationDate`, 대학원 페이지의
D-day에서도 같이 씀), 입학/연구분야 소개(`admissionLabel`, `researchFocus`)를
이 파일에서 관리합니다. **`graduationDate`는 "2028년 졸업 예정"까지만 알아서
월/일은 임시값(2028-02-29)이 들어가 있으니 정확한 날짜가 정해지면 이 값만
수정하면 됩니다.**

### 대학원 프로젝트 — `src/data/career/graduate-projects.json`

```jsonc
{
  "id": "...",
  "title": "...",
  "status": "진행중", // 또는 "완료"
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD 또는 null", // 진행중이면 null
  "summary": "카드용 한 줄 설명",
  "body": "상세 페이지 본문 (선택, 마크다운 가능)"
}
```

`상태`가 "진행중"이면 대학원 페이지 상단에 카드 그리드로, "완료"면 아래에
아코디언(`<details>`)으로 접혀서 표시됩니다. 클릭하면
`#/career/graduate/project/:id` 상세 페이지로 이동.

### 연구 진행 상황 로그 — `src/data/career/research-log.json`

```jsonc
{
  "id": "...",
  "periodStart": "YYYY-MM-DD",
  "periodEnd": "YYYY-MM-DD",
  "title": "...",
  "completed": ["완료한 과제 1", "완료한 과제 2"],
  "nextSteps": ["다음 계획 1", "다음 계획 2"],
  "image": "images/xxx.png 또는 null"
}
```

박사님께 보내는 격주 bi-weekly 보고 내용을 텍스트로 요약해서 새 항목으로
추가하는 용도. [src/lib/loadGraduate.ts](src/lib/loadGraduate.ts)가 기간
시작일(`periodStart`) 최신순으로 정렬해서 대학원 페이지 타임라인에 보여줍니다.
목록에는 완료 과제 앞 1~2줄만, 클릭하면 `#/career/graduate/log/:id`에서
전체 내용을 볼 수 있습니다.

## 업데이트 워크플로우

- **Assets**: 격주/매달 증권 앱 스크린샷을 주면 잔액·수익률만 읽어서
  (계좌번호·개인정보는 저장 금지) 새 `YYYY-MM.json` 추가 → 그래프 자동 반영
- **Insights/취업 준비/Life**: "이런 내용 카드로 추가해줘"라고 텍스트로 요청하면
  해당 섹션 JSON에 카드 추가
- **대학원 연구 로그**: 박사님께 보내는 격주 bi-weekly PPT를 만들고 나면, 그
  내용을 텍스트로 요약해서 알려주면 `research-log.json`에 새 항목으로 추가
  (스크린샷보다 직접 요약하는 게 더 정확해서 이 방식으로)

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

5개 섹션 + 카드 상세 페이지 + Career 드롭다운(대학원/취업 준비) + 다크 기본/
화이트 예외 디자인 시스템 + Assets 실데이터(2026-05-24 기준)로 구조를 잡은
초안. Insights/취업 준비/Life는 더미 카드 1~2개로, 대학원 페이지는 진행중
프로젝트 2개/완료 1개/연구 로그 3개 더미로 레이아웃만 확인. 모바일 화면에서
카드 그리드/상세 페이지 깨짐 여부는 아직 실기기 확인 전.
