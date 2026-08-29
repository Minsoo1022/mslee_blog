import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { IsaHolding } from "../types/assets";
import { formatKRW } from "../lib/format";

interface Props {
  holdings: IsaHolding[];
  /** 예수금을 별도 슬라이스로 포함시키고 싶을 때 (0/undefined면 생략) */
  cashAmount?: number;
  cashLabel?: string;
}

// 럭셔리 톤에 맞춘 골드~플럼 계열 팔레트 (무지개색 지양)
const COLORS = [
  "#C4921B", // gold
  "#251019", // plum black
  "#8A867A", // warm gray
  "#7A4A1E", // deep bronze
  "#5C3A46", // muted plum
  "#B8A369", // sand gold
  "#3E2A2E", // dark wine
  "#9C6B2E", // amber brown (예수금 슬라이스용 여분)
];

// 조각이 너무 얇으면(6% 미만) 파이 위 라벨을 생략하고 범례로만 구분 —
// 라벨끼리 겹쳐서 깨져 보이던 문제 완화
const MIN_LABEL_PERCENT = 0.06;

export default function PortfolioPieChart({ holdings, cashAmount, cashLabel = "예수금" }: Props) {
  const data = holdings.map((h) => ({ name: h.name, value: h.amount }));
  if (cashAmount) {
    data.push({ name: cashLabel, value: cashAmount });
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={(entry: { percent?: number }) =>
            (entry.percent ?? 0) < MIN_LABEL_PERCENT
              ? ""
              : `${((entry.percent ?? 0) * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        {/* 커서를 따라다니지 않고 차트 좌상단 고정 위치에 떠서, 파이 라벨과 안 겹치게 */}
        <Tooltip formatter={(value) => formatKRW(value as number)} position={{ x: 0, y: 0 }} />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ fontSize: 12, lineHeight: "20px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
