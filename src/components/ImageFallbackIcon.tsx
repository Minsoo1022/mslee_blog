// 카드에 이미지가 없을 때 쓰는 흐린 폴백 아이콘 (깨진 이미지 아이콘 대신)
export default function ImageFallbackIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="40"
      height="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="4" y="8" width="40" height="32" rx="3" />
      <circle cx="16" cy="19" r="4" />
      <path d="M4 34 L17 22 L26 30 L33 24 L44 33" />
    </svg>
  );
}
