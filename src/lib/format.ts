export function formatKRW(value: number | string | undefined): string {
  const num = typeof value === "number" ? value : Number(value ?? 0);
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatPct(value: number, digits = 2): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}%`;
}

export function formatDateLabel(date: string): string {
  const [y, m, d] = date.split("-");
  return d ? `${y}.${m}.${d}` : `${y}.${m}`;
}

/** YYYY-MM-DD 문자열 기준 D-day 계산 (오늘 대비 남은 일수, 음수면 지남) */
export function daysUntil(targetDate: string): number {
  const target = new Date(`${targetDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}
