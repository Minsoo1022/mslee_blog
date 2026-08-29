import type { AssetHierarchy, IsaHolding, MonthlySnapshot, RiskRatio } from "../types/assets";

// src/data/assets/YYYY-MM.json 파일을 전부 자동으로 읽어온다.
// 새 달 파일을 추가하기만 하면 여기서 자동으로 인식되어
// Home/Assets 화면에 반영된다. (코드 수정 불필요)
const modules = import.meta.glob<MonthlySnapshot>("../data/assets/*.json", {
  eager: true,
  import: "default",
});

/** 기준일(date) 오름차순으로 정렬된 전체 스냅샷 목록 */
export const monthlySnapshots: MonthlySnapshot[] = Object.values(modules).sort(
  (a, b) => a.date.localeCompare(b.date),
);

export function getLatestSnapshot(): MonthlySnapshot | undefined {
  return monthlySnapshots.at(-1);
}

export function getPreviousSnapshot(): MonthlySnapshot | undefined {
  return monthlySnapshots.at(-2);
}

/** 전월 대비 총자산 증감률(%). 이전 스냅샷이 없으면 null. */
export function getMoMReturnPct(
  current: MonthlySnapshot,
  previous?: MonthlySnapshot,
): number | null {
  if (!previous || previous.totalAssets === 0) return null;
  return ((current.totalAssets - previous.totalAssets) / previous.totalAssets) * 100;
}

/** 전월 대비 총자산 증감액. 이전 스냅샷이 없으면 null. */
export function getMoMDiff(
  current: MonthlySnapshot,
  previous?: MonthlySnapshot,
): number | null {
  if (!previous) return null;
  return current.totalAssets - previous.totalAssets;
}

/** 목표 위험자산 비중 70%, 허용 범위 65~75% */
const RISK_TARGET_MIN = 65;
const RISK_TARGET_MAX = 75;

// 자산 구성 다이어그램에서 "주택청약"으로 따로 떼어낼 계좌명
const HOUSING_ACCOUNT_NAME = "청년주택드림청약통장";

function sumByType(holdings: IsaHolding[], type: IsaHolding["type"]): number {
  return holdings.filter((h) => h.type === type).reduce((sum, h) => sum + h.amount, 0);
}

function buildRiskRatio(riskSum: number, totalAssets: number): RiskRatio {
  const safeSum = totalAssets - riskSum;
  const denom = riskSum + safeSum;
  const riskPct = denom === 0 ? 0 : (riskSum / denom) * 100;

  let status: RiskRatio["status"];
  let statusLabel: string;
  if (riskPct < RISK_TARGET_MIN) {
    status = "buy_risk";
    statusLabel = "위험자산 매수 필요";
  } else if (riskPct > RISK_TARGET_MAX) {
    status = "sell_risk";
    statusLabel = "일부 매도 필요";
  } else {
    status = "normal";
    statusLabel = "정상 범위";
  }

  return { riskSum, safeSum, riskPct, status, statusLabel };
}

/**
 * 전체 자산 기준 위험자산 비중.
 * 위험자산 = ISA·위탁계좌 보유 종목 중 type이 "위험자산"인 것 전부 합산.
 * 그 외(안전자산 성격 보유 종목 + 모든 예수금/현금성 계좌 + 청약통장 등)는
 * 전부 안전자산으로 취급 — totalAssets에서 위험자산 합계를 뺀 값으로 계산한다.
 */
export function getRiskRatio(snapshot: MonthlySnapshot): RiskRatio {
  const riskSum =
    sumByType(snapshot.isaPortfolio, "위험자산") +
    sumByType(snapshot.brokeragePortfolio ?? [], "위험자산");

  return buildRiskRatio(riskSum, snapshot.totalAssets);
}

/**
 * 전체자산 계층형 구성 (주식[ISA/위탁] / 주택청약 / 예수금·현금성 자산).
 * 예수금은 나머지(잔차)로 계산해서, 향후 계좌가 추가/변경돼도 항상
 * stocks + housing + cash = totalAssets가 유지되도록 한다.
 */
export function getAssetHierarchy(snapshot: MonthlySnapshot): AssetHierarchy {
  const isaStocks = snapshot.isaPortfolio.reduce((sum, h) => sum + h.amount, 0);
  const brokerageStocks = (snapshot.brokeragePortfolio ?? []).reduce(
    (sum, h) => sum + h.amount,
    0,
  );
  const housing =
    snapshot.accounts.find((a) => a.name === HOUSING_ACCOUNT_NAME)?.amount ?? 0;
  const cash = snapshot.totalAssets - isaStocks - brokerageStocks - housing;

  return {
    stocks: { isa: isaStocks, brokerage: brokerageStocks },
    housing,
    cash,
  };
}

/** 총자산 추이 (라인 차트용) */
export function getAssetTrend() {
  return monthlySnapshots.map((s) => ({
    date: s.date,
    total: s.totalAssets,
  }));
}
