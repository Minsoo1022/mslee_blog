import SummaryCard from "../components/SummaryCard";
import AccountsTable from "../components/AccountsTable";
import AssetTrendChart from "../components/AssetTrendChart";
import MonthlyReturnCard from "../components/MonthlyReturnCard";
import AssetHierarchyChart from "../components/AssetHierarchyChart";
import PortfolioPieChart from "../components/PortfolioPieChart";
import RiskGauge from "../components/RiskGauge";
import StockReturnBarChart from "../components/StockReturnBarChart";
import {
  getAssetHierarchy,
  getAssetTrend,
  getLatestSnapshot,
  getMoMDiff,
  getMoMReturnPct,
  getPreviousSnapshot,
  getRiskRatio,
} from "../lib/loadAssets";
import { formatKRW, formatPct } from "../lib/format";

export default function Assets() {
  const latest = getLatestSnapshot();
  const previous = getPreviousSnapshot();

  if (!latest) {
    return (
      <div className="empty-state">
        <p>
          아직 자산 데이터가 없습니다. <code>src/data/assets/YYYY-MM.json</code>{" "}
          파일을 추가해주세요.
        </p>
      </div>
    );
  }

  const momPct = getMoMReturnPct(latest, previous);
  const momDiff = getMoMDiff(latest, previous);
  const trend = getAssetTrend();
  const risk = getRiskRatio(latest);
  const hierarchy = getAssetHierarchy(latest);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Assets</h1>
        <p className="page-sub">기준일: {latest.date}</p>
      </div>

      <div className="summary-grid">
        <SummaryCard label="총자산" value={formatKRW(latest.totalAssets)} />
        <SummaryCard
          label="전월 대비"
          value={momPct === null ? "—" : formatPct(momPct)}
          tone={momPct === null ? "neutral" : momPct >= 0 ? "positive" : "negative"}
          sub={previous ? `기준일 ${previous.date}` : "이전 스냅샷 없음"}
        />
        <SummaryCard
          label="전체 위험자산 비중"
          value={`${risk.riskPct.toFixed(1)}%`}
          tone={risk.status === "normal" ? "neutral" : "negative"}
          sub={risk.statusLabel}
        />
      </div>

      <section className="panel panel--table">
        <h2>계좌별 현황</h2>
        <AccountsTable accounts={latest.accounts} total={latest.totalAssets} />
      </section>

      <section className="panel">
        <h2>월별 총자산 추이</h2>
        <div className="trend-with-return">
          <div className="trend-with-return__chart">
            <AssetTrendChart data={trend} />
            {trend.length < 2 && (
              <p className="page-sub" style={{ marginTop: 8 }}>
                아직 한 달치 데이터만 있어 추이가 점 하나로 보입니다. 다음 달
                스냅샷이 쌓이면 선 그래프로 채워집니다.
              </p>
            )}
          </div>
          <MonthlyReturnCard
            diff={momDiff}
            pct={momPct}
            baselineLabel={
              previous ? `${previous.date} → ${latest.date}` : `${latest.date} 기준`
            }
          />
        </div>
      </section>

      <section>
        <h2 className="section-title">자산 구성</h2>
        <div className="panel-grid">
          <section className="panel">
            <h2>전체자산 계층 구성</h2>
            <AssetHierarchyChart hierarchy={hierarchy} />
          </section>
          <section className="panel">
            <h2>ISA 포트폴리오 구성</h2>
            <PortfolioPieChart holdings={latest.isaPortfolio} cashAmount={latest.isaCash} />
          </section>
          <section className="panel">
            <h2>위탁계좌 포트폴리오 구성</h2>
            {latest.brokeragePortfolio ? (
              <PortfolioPieChart
                holdings={latest.brokeragePortfolio}
                cashAmount={latest.brokerageCash}
              />
            ) : (
              <p className="page-sub">위탁계좌 보유 종목 데이터가 없습니다.</p>
            )}
          </section>
        </div>
      </section>

      <section className="panel">
        <h2>위험자산 vs 안전자산 (전체 자산 기준)</h2>
        <RiskGauge risk={risk} />
      </section>

      <section className="panel">
        <h2>종목별 수익률 (ISA)</h2>
        <StockReturnBarChart holdings={latest.isaPortfolio} />
      </section>
    </div>
  );
}
