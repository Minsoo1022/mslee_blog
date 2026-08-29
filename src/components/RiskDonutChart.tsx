import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { RiskRatio } from "../types/assets";
import { formatKRW } from "../lib/format";

interface Props {
  risk: RiskRatio;
}

// 사이트 기본 톤(다크네이비+골드)과 안 부딪히는 파스텔 블루/레드
const SAFE_COLOR = "#8FB2CE";
const RISK_COLOR = "#D99A9A";

export default function RiskDonutChart({ risk }: Props) {
  const data = [
    { name: "안전자산", value: risk.safeSum, color: SAFE_COLOR },
    { name: "위험자산", value: risk.riskSum, color: RISK_COLOR },
  ];

  return (
    <div className="risk-donut">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={62}
            outerRadius={95}
            label={(entry: { name?: string; percent?: number }) =>
              `${entry.name} ${((entry.percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatKRW(value as number)} position={{ x: 0, y: 0 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className={`risk-gauge__status risk-gauge__status--${risk.status}`}>
        위험자산 비중 {risk.riskPct.toFixed(1)}% — {risk.statusLabel}
      </div>
    </div>
  );
}
