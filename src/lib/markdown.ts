import { marked } from "marked";

marked.setOptions({ breaks: true });

/**
 * 카드 본문(마크다운)을 HTML로 변환.
 * body 필드는 본인이 직접 입력하는 신뢰할 수 있는 콘텐츠라 그대로 렌더링한다.
 * (외부/사용자 입력을 그대로 받는 구조로 바뀌면 sanitize를 추가해야 함)
 */
export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false });
}
