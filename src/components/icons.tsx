// 카드뉴스 폴백용 아이콘 세트 (Tabler 아이콘 스타일 — 24x24, stroke 기반)
// 사진이 없는 카드에 "깨진 이미지" 대신 카테고리에 맞는 아이콘 하나만 옅게 얹는다.
import type { ComponentType } from "react";

type IconProps = { className?: string };
type IconComponent = ComponentType<IconProps>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconChartBar({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
    </svg>
  );
}

export function IconBuilding({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M13 21h6a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1h-6M5 21h14M8 8h.01M8 11h.01M8 14h.01M8 17h.01" />
    </svg>
  );
}

export function IconCpu({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  );
}

export function IconFlask({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 3h6M10 3v5.5L5.5 17a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 8.5V3M7.5 14h9" />
    </svg>
  );
}

export function IconCertificate({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="5" />
      <path d="M9 12.5 8 21l4-2 4 2-1-8.5" />
    </svg>
  );
}

export function IconPlane({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3 12.5 21 6l-6 18-2.5-7.5L3 12.5Z" />
    </svg>
  );
}

export function IconHeartPulse({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M19.5 12.6 12 20l-7.5-7.4a4.6 4.6 0 0 1 6.5-6.5L12 7l1-1a4.6 4.6 0 0 1 6.5 6.5Z" />
      <path d="M6 12h2l1.5-3L11 15l1.5-3H18" />
    </svg>
  );
}

export function IconNotebook({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 3v18M15 8h-2M15 12h-2" />
    </svg>
  );
}

const TAG_ICON_MAP: [string[], IconComponent][] = [
  [["AI"], IconCpu],
  [["경제", "부동산"], IconBuilding],
  [["주식"], IconChartBar],
  [["연구", "대학원"], IconFlask],
  [["영어", "자격증"], IconCertificate],
  [["여행"], IconPlane],
  [["운동", "건강"], IconHeartPulse],
];

/** 카드 태그를 보고 어울리는 폴백 아이콘을 고른다. 매칭 없으면 기본 노트 아이콘 */
export function pickIconForTags(tags: string[]): IconComponent {
  for (const [keys, Icon] of TAG_ICON_MAP) {
    if (tags.some((t) => keys.includes(t))) return Icon;
  }
  return IconNotebook;
}
