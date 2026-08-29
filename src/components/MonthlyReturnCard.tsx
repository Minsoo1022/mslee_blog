import { formatKRW, formatPct } from "../lib/format";

interface Props {
  diff: number | null;
  pct: number | null;
  baselineLabel: string;
}

// 국내 증권 앱 관례: 상승(증가) 빨강 / 하락(감소) 파랑.
// 사이트 전역의 --color-positive/--color-negative(좋음=초록/나쁨=적갈)와는
// 별개 규칙이라, 이 카드에서만 쓰는 전용 색을 둔다.
const UP_COLOR = "#c0392b";
const DOWN_COLOR = "#2f6fb0";

export default function MonthlyReturnCard({ diff, pct, baselineLabel }: Props) {
  const color = diff === null ? "var(--text-primary)" : diff >= 0 ? UP_COLOR : DOWN_COLOR;

  return (
    <div className="summary-card monthly-return-card">
      <div className="summary-card__label">이번 달 수익률</div>
      <div className="summary-card__value" style={{ color }}>
        {diff === null ? "—" : `${diff >= 0 ? "+" : ""}${formatKRW(diff)}`}
      </div>
      <div className="summary-card__sub" style={{ color: diff === null ? undefined : color }}>
        {pct === null ? "이전 스냅샷 없음" : formatPct(pct)}
      </div>
      <div className="summary-card__sub">{baselineLabel}</div>
    </div>
  );
}
