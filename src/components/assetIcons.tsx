// Assets 페이지 전용 소형 아이콘 (Tabler 스타일, 16~20px, stroke 기반)
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.4 3 7.4 7 9 4-1.6 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconTrendingUp({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3 17 9 11 13 15 21 7" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function IconChartLine({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 19h16" />
      <path d="M4 15 9 9l4 3 6-7" />
    </svg>
  );
}

export function IconBuildingBank({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v9M9 10v9M15 10v9M19 10v9" />
      <path d="M3 19h18" />
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

/** 계좌명 → 계좌별 현황 표에 쓸 아이콘 매핑 */
const ACCOUNT_ICON_MAP: [string[], (props: IconProps) => ReturnType<typeof IconHome>][] = [
  [["ISA 계좌 (한투)", "한투 위탁계좌"], IconChartLine],
  [["청년주택드림청약통장"], IconHome],
  [["토스뱅크", "저축예금", "하나은행", "기타 계좌 (KB/우리)"], IconBuildingBank],
];

export function pickAccountIcon(name: string) {
  for (const [names, Icon] of ACCOUNT_ICON_MAP) {
    if (names.includes(name)) return Icon;
  }
  return null;
}
