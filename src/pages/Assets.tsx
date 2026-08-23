import SummaryCard from "../components/SummaryCard";
import AccountsTable from "../components/AccountsTable";
import AssetTrendChart from "../components/AssetTrendChart";
import IsaPieChart from "../components/IsaPieChart";
import RiskGauge from "../components/RiskGauge";
import StockReturnBarChart from "../components/StockReturnBarChart";
import {
  getAssetTrend,
  getLatestSnapshot,
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
  const trend = getAssetTrend();
  const risk = getRiskRatio(latest);

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
          label="ISA 위험자산 비중"
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
        <AssetTrendChart data={trend} />
        {trend.length < 2 && (
          <p className="page-sub" style={{ marginTop: 8 }}>
            아직 한 달치 데이터만 있어 추이가 점 하나로 보입니다. 다음 달
            스냅샷이 쌓이면 선 그래프로 채워집니다.
          </p>
        )}
      </section>

      <div className="panel-grid">
        <section className="panel">
          <h2>ISA 포트폴리오 구성</h2>
          <IsaPieChart holdings={latest.isaPortfolio} />
          <p className="page-sub" style={{ marginTop: 8 }}>
            예수금 {formatKRW(latest.isaCash)}은 비중 계산에서 제외
          </p>
        </section>
        <section className="panel">
          <h2>위험자산 vs 안전자산</h2>
          <RiskGauge risk={risk} />
        </section>
      </div>

      <section className="panel">
        <h2>종목별 수익률</h2>
        <StockReturnBarChart holdings={latest.isaPortfolio} />
      </section>
    </div>
  );
}
