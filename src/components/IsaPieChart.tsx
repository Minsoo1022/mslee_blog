import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { IsaHolding } from "../types/assets";
import { formatKRW } from "../lib/format";

interface Props {
  holdings: IsaHolding[];
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
];

export default function IsaPieChart({ holdings }: Props) {
  const data = holdings.map((h) => ({ name: h.name, value: h.amount }));

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
            `${((entry.percent ?? 0) * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatKRW(value as number)} />
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
