import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { AssetHierarchy } from "../types/assets";
import { formatKRW } from "../lib/format";

interface Props {
  hierarchy: AssetHierarchy;
}

// 대분류별로 한 색 계열을 잡고, 안쪽 링은 진하게 / 바깥쪽 링은 연하게(또는
// 세부 항목별로 같은 계열 안에서 명도만 다르게) — 완전히 다른 색은 섞지 않는다.
const GOLD_DARK = "#C4921B"; // 주식 (대분류, ISA)
const GOLD_LIGHT = "#E3C173"; // 주식 - 위탁계좌 (세부)
const NAVY_DARK = "#1F3540"; // 주택청약 (대분류)
const NAVY_LIGHT = "#3E5A66"; // 주택청약 (세부, 단일값이라 톤만 살짝 밝게)
const BEIGE_DARK = "#9C8F72"; // 예수금 (대분류)
const BEIGE_LIGHT = "#C9BFA8"; // 예수금 (세부, 단일값)

const MIN_LABEL_PERCENT = 0.06;

export default function AssetHierarchyChart({ hierarchy }: Props) {
  const stocksTotal = hierarchy.stocks.isa + hierarchy.stocks.brokerage;

  const innerData = [
    { name: "주식", value: stocksTotal, color: GOLD_DARK },
    { name: "주택청약", value: hierarchy.housing, color: NAVY_DARK },
    { name: "예수금", value: hierarchy.cash, color: BEIGE_DARK },
  ];

  const outerData = [
    { name: "주식 (ISA)", value: hierarchy.stocks.isa, color: GOLD_DARK },
    { name: "주식 (위탁)", value: hierarchy.stocks.brokerage, color: GOLD_LIGHT },
    { name: "주택청약", value: hierarchy.housing, color: NAVY_LIGHT },
    { name: "예수금", value: hierarchy.cash, color: BEIGE_LIGHT },
  ];

  const legendItems = outerData.filter((d) => d.value > 0);

  return (
    <div className="asset-hierarchy-chart">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={innerData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={62}
            label={false}
          >
            {innerData.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Pie
            data={outerData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={100}
            label={(entry: { percent?: number }) =>
              (entry.percent ?? 0) < MIN_LABEL_PERCENT
                ? ""
                : `${((entry.percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {outerData.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatKRW(value as number)} position={{ x: 0, y: 0 }} />
        </PieChart>
      </ResponsiveContainer>
      {/* recharts 기본 Legend는 두 겹 Pie의 항목이 중복 렌더돼서 직접 그림 */}
      <ul className="asset-hierarchy-chart__legend">
        {legendItems.map((d) => (
          <li key={d.name}>
            <span className="asset-hierarchy-chart__swatch" style={{ background: d.color }} />
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
