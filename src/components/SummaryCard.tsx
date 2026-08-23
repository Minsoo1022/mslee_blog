interface SummaryCardProps {
  label: string;
  value: string;
  sub?: string;
  tone?: "neutral" | "positive" | "negative";
}

export default function SummaryCard({
  label,
  value,
  sub,
  tone = "neutral",
}: SummaryCardProps) {
  return (
    <div className="summary-card">
      <div className="summary-card__label">{label}</div>
      <div className={`summary-card__value summary-card__value--${tone}`}>
        {value}
      </div>
      {sub && <div className="summary-card__sub">{sub}</div>}
    </div>
  );
}
