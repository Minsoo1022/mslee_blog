import type { ComponentType } from "react";
import type { NamedAmount } from "../lib/loadAssets";
import { formatKRW } from "../lib/format";

interface Props {
  title: string;
  icon: ComponentType<{ className?: string }>;
  items: NamedAmount[];
  accentColor: string;
  /** 비중 계산 기준 — 전체 자산 총액 (카테고리 내부 비중이 아니라 전체자산 대비 비중을 보여줌) */
  totalAssets: number;
}

export default function AssetCategoryBox({
  title,
  icon: Icon,
  items,
  accentColor,
  totalAssets,
}: Props) {
  return (
    <div className="asset-category-box">
      <div className="asset-category-box__header">
        <span className="asset-category-box__icon" style={{ color: accentColor }}>
          <Icon />
        </span>
        <h3>{title}</h3>
      </div>
      <ul className="asset-category-box__list">
        {items.map((item) => (
          <li key={item.name}>
            <span className="asset-category-box__name">{item.name}</span>
            <span className="asset-category-box__amount">{formatKRW(item.amount)}</span>
            <span className="asset-category-box__pct">
              {totalAssets > 0 ? ((item.amount / totalAssets) * 100).toFixed(1) : "0.0"}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
