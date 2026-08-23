import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { IsaHolding } from "../types/assets";
import { formatPct } from "../lib/format";

interface Props {
  holdings: IsaHolding[];
}

export default function StockReturnBarChart({ holdings }: Props) {
  const data = holdings
    .slice()
    .sort((a, b) => b.returnPct - a.returnPct)
    .map((h) => ({ name: h.name, returnPct: h.returnPct }));

  return (
    <ResponsiveContainer width="100%" height={Math.max(280, data.length * 40)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 8, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={190}
          tick={{ fontSize: 12, fill: "var(--color-text)" }}
        />
        <Tooltip formatter={(value) => formatPct(value as number)} />
        <Bar dataKey="returnPct" name="수익률" radius={[0, 4, 4, 0]}>
          {data.map((d) => (
            <Cell
              key={d.name}
              fill={d.returnPct >= 0 ? "var(--color-gold)" : "#7A4A1E"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
