import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { RiskRatio } from "../types/assets";
import { formatKRW } from "../lib/format";

interface Props {
  risk: RiskRatio;
}

// 사이트 기본 톤(다크네이비+골드)과 안 부딪히는 파스텔 블루/레드
const SAFE_COLOR = "#8FB2CE";
const RISK_COLOR = "#D99A9A";

const RADIAN = Math.PI / 180;

interface LabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

// 조각 바깥으로 나가는 라벨(리더 라인)이 차트 영역을 벗어나 잘리던 문제라,
// 링 안쪽 정중앙에 퍼센트만 표시하는 방식으로 바꿔 절대 잘리지 않게 한다.
function renderInsideLabel({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent,
}: LabelProps) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="var(--color-text)"
      fontSize={13}
      fontWeight={700}
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
}

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
            labelLine={false}
            label={renderInsideLabel}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatKRW(value as number)} position={{ x: 0, y: 0 }} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="risk-donut__legend">
        {data.map((d) => (
          <li key={d.name}>
            <span className="risk-donut__swatch" style={{ background: d.color }} />
            {d.name}
          </li>
        ))}
      </ul>
      <div className={`risk-gauge__status risk-gauge__status--${risk.status}`}>
        위험자산 비중 {risk.riskPct.toFixed(1)}% — {risk.statusLabel}
      </div>
    </div>
  );
}
