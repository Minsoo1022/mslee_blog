import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatKRW, formatDateLabel } from "../lib/format";

interface Props {
  data: { date: string; total: number }[];
}

export default function AssetTrendChart({ data }: Props) {
  const chartData = data.map((d) => ({ ...d, label: formatDateLabel(d.date) }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: "var(--color-text-muted)" }} />
        <YAxis
          tick={{ fontSize: 12, fill: "var(--color-text-muted)" }}
          tickFormatter={(v) => `${(v / 10000).toLocaleString()}만`}
          width={64}
        />
        <Tooltip formatter={(value) => formatKRW(value as number)} />
        <Line
          type="monotone"
          dataKey="total"
          name="총자산"
          stroke="var(--color-gold)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--color-gold)" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
