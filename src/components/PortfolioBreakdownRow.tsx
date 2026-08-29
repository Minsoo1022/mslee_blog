import PortfolioPieChart, { PORTFOLIO_COLORS } from "./PortfolioPieChart";
import type { IsaHolding } from "../types/assets";
import { formatKRW } from "../lib/format";

interface Props {
  title: string;
  holdings: IsaHolding[];
  cashAmount?: number;
  cashLabel?: string;
}

export default function PortfolioBreakdownRow({
  title,
  holdings,
  cashAmount,
  cashLabel = "예수금",
}: Props) {
  const rows = holdings.map((h) => ({ name: h.name, amount: h.amount }));
  if (cashAmount) {
    rows.push({ name: cashLabel, amount: cashAmount });
  }
  const total = rows.reduce((sum, r) => sum + r.amount, 0);

  return (
    <section className="panel portfolio-breakdown-row">
      <h2>{title}</h2>
      <div className="portfolio-breakdown-row__body">
        <div className="portfolio-breakdown-row__chart">
          <PortfolioPieChart holdings={holdings} cashAmount={cashAmount} cashLabel={cashLabel} bare />
        </div>
        <div className="table-wrap portfolio-breakdown-row__table">
          <table className="data-table">
            <thead>
              <tr>
                <th>종목</th>
                <th style={{ textAlign: "right" }}>평가금액</th>
                <th style={{ textAlign: "right" }}>비중</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.name}>
                  <td>
                    <span
                      className="portfolio-breakdown-row__swatch"
                      style={{ background: PORTFOLIO_COLORS[i % PORTFOLIO_COLORS.length] }}
                    />
                    {r.name}
                  </td>
                  <td style={{ textAlign: "right" }}>{formatKRW(r.amount)}</td>
                  <td style={{ textAlign: "right" }}>
                    {total > 0 ? ((r.amount / total) * 100).toFixed(1) : "0.0"}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
