import type { IsaHolding, MonthlySnapshot, RiskRatio } from "../types/assets";

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

// isaPortfolio/brokeragePortfolio 및 isaCash/brokerageCash로 이미 별도 집계되는
// 두 계좌는, "그 외 계좌 전부는 안전자산"으로 취급하는 로직에서 중복 합산되지
// 않도록 이름으로 제외한다.
const ISA_ACCOUNT_NAME = "ISA 계좌 (한투)";
const BROKERAGE_ACCOUNT_NAME = "한투 위탁계좌";

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

export interface NamedAmount {
  name: string;
  amount: number;
}

/**
 * 안전자산 목록: ISA/위탁 보유 종목 중 안전자산 성격 + ISA·위탁계좌를 제외한
 * 나머지 계좌 전부(청약/은행/저축예금 등, 전부 현금성) + ISA·위탁 예수금 합산.
 */
export function getSafeAssetItems(snapshot: MonthlySnapshot): NamedAmount[] {
  const items: NamedAmount[] = [
    ...snapshot.isaPortfolio
      .filter((h) => h.type === "안전자산")
      .map((h) => ({ name: h.name, amount: h.amount })),
    ...(snapshot.brokeragePortfolio ?? [])
      .filter((h) => h.type === "안전자산")
      .map((h) => ({ name: h.name, amount: h.amount })),
    ...snapshot.accounts
      .filter((a) => a.name !== ISA_ACCOUNT_NAME && a.name !== BROKERAGE_ACCOUNT_NAME)
      .map((a) => ({ name: a.name, amount: a.amount })),
  ];

  const cash = snapshot.isaCash + (snapshot.brokerageCash ?? 0);
  if (cash > 0) {
    items.push({ name: "ISA·위탁계좌 예수금", amount: cash });
  }

  return items.sort((a, b) => b.amount - a.amount);
}

/**
 * 위험자산 목록: ISA+위탁계좌에서 실제 보유 중인 위험자산 성격 종목 전부를
 * 이름 기준으로 통합(같은 종목을 여러 계좌에서 보유하면 합산)해서 보여준다.
 */
export function getRiskAssetItems(snapshot: MonthlySnapshot): NamedAmount[] {
  const holdings = [
    ...snapshot.isaPortfolio,
    ...(snapshot.brokeragePortfolio ?? []),
  ].filter((h) => h.type === "위험자산");

  const merged = new Map<string, number>();
  for (const h of holdings) {
    merged.set(h.name, (merged.get(h.name) ?? 0) + h.amount);
  }

  return Array.from(merged.entries())
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount);
}

/** 총자산 추이 (라인 차트용) */
export function getAssetTrend() {
  return monthlySnapshots.map((s) => ({
    date: s.date,
    total: s.totalAssets,
  }));
}
