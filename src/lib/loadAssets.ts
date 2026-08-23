import type { MonthlySnapshot, RiskRatio } from "../types/assets";

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

/** 목표 위험자산 비중 70%, 허용 범위 65~75% */
const RISK_TARGET_MIN = 65;
const RISK_TARGET_MAX = 75;

/**
 * ISA 포트폴리오의 위험자산 비중 계산.
 * isaCash(예수금)는 계산에서 제외 — riskSum / (riskSum + safeSum) 기준.
 */
export function getRiskRatio(snapshot: MonthlySnapshot): RiskRatio {
  const riskSum = snapshot.isaPortfolio
    .filter((h) => h.type === "위험자산")
    .reduce((sum, h) => sum + h.amount, 0);
  const safeSum = snapshot.isaPortfolio
    .filter((h) => h.type === "안전자산")
    .reduce((sum, h) => sum + h.amount, 0);

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

/** 총자산 추이 (라인 차트용) */
export function getAssetTrend() {
  return monthlySnapshots.map((s) => ({
    date: s.date,
    total: s.totalAssets,
  }));
}
