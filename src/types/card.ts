export type CardSection = "insights" | "career" | "life";

export interface Card {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  title: string;
  tags: string[];
  /** 카드 목록용 한 줄 요약 */
  summary: string;
  /** src/data/images/ 안의 파일명을 상대경로로. 없으면 null (폴백 스타일 적용) */
  image: string | null;
  /** 상세 페이지 본문. 마크다운 가능 */
  body: string;
}
