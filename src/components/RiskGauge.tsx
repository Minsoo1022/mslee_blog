import type { RiskRatio } from "../types/assets";

interface Props {
  risk: RiskRatio;
  targetMin?: number;
  targetMax?: number;
}

export default function RiskGauge({ risk, targetMin = 65, targetMax = 75 }: Props) {
  const pct = Math.min(100, Math.max(0, risk.riskPct));

  return (
    <div className="risk-gauge">
      <div className="risk-gauge__track">
        <div
          className="risk-gauge__target-zone"
          style={{ left: `${targetMin}%`, width: `${targetMax - targetMin}%` }}
        />
        <div className="risk-gauge__marker" style={{ left: `${pct}%` }} />
      </div>
      <div className="risk-gauge__scale">
        <span>0%</span>
        <span>목표 70% (허용 {targetMin}–{targetMax}%)</span>
        <span>100%</span>
      </div>
      <div className={`risk-gauge__status risk-gauge__status--${risk.status}`}>
        위험자산 비중 {risk.riskPct.toFixed(1)}% — {risk.statusLabel}
      </div>
    </div>
  );
}
