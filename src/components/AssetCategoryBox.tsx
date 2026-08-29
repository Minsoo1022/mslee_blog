import type { ComponentType } from "react";
import type { NamedAmount } from "../lib/loadAssets";
import { formatKRW } from "../lib/format";

interface Props {
  title: string;
  icon: ComponentType<{ className?: string }>;
  items: NamedAmount[];
  accentColor: string;
}

export default function AssetCategoryBox({ title, icon: Icon, items, accentColor }: Props) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

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
              {total > 0 ? ((item.amount / total) * 100).toFixed(1) : "0.0"}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
