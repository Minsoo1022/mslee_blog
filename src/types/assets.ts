// 월별 자산 스냅샷 타입
// ⚠️ 계좌번호, 주민등록번호, 실명, 주소 등 개인 식별정보는 절대 포함하지 말 것.
// account.name은 "ISA 계좌 (한투)"처럼 계좌 종류만 나타내는 라벨을 쓴다.

export interface AccountBalance {
  name: string;
  amount: number;
  note?: string;
}

export type AssetType = "위험자산" | "안전자산";

export interface IsaHolding {
  name: string;
  amount: number;
  returnPct: number;
  type: AssetType;
}

export interface MonthlySnapshot {
  /** 스냅샷 기준일 YYYY-MM-DD */
  date: string;
  /** 전체 총자산 (원) — 계좌 합산이 아니라 실제 집계 기준값을 그대로 기록 */
  totalAssets: number;
  accounts: AccountBalance[];
  isaPortfolio: IsaHolding[];
  /** ISA 예수금(현금) — 위험자산 비중 계산에서 제외 */
  isaCash: number;
  /** 위탁계좌 보유 종목 (선택 — 없으면 위탁 파이차트/전체자산 비중 계산에서 제외) */
  brokeragePortfolio?: IsaHolding[];
  /** 위탁계좌 예수금(현금) (선택) */
  brokerageCash?: number;
}

export interface RiskRatio {
  riskSum: number;
  safeSum: number;
  /** 위험자산 / (위험자산 + 안전자산) * 100, 예수금 제외 */
  riskPct: number;
  status: "buy_risk" | "sell_risk" | "normal";
  statusLabel: string;
}

/** 전체자산 계층형 구성 (주식[ISA/위탁] · 주택청약 · 예수금) */
export interface AssetHierarchy {
  stocks: { isa: number; brokerage: number };
  housing: number;
  cash: number;
}
