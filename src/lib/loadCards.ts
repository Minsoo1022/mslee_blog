import type { Card, CardSection } from "../types/card";
import insights from "../data/cards/insights.json";
import career from "../data/cards/career.json";
import life from "../data/cards/life.json";

const sections: Record<CardSection, Card[]> = {
  insights: insights as Card[],
  career: career as Card[],
  life: life as Card[],
};

/** 해당 섹션의 카드를 최신순으로 반환 */
export function getCards(section: CardSection): Card[] {
  return sections[section].slice().sort((a, b) => b.date.localeCompare(a.date));
}

/** 모든 태그 목록 (중복 제거, 등장 순) */
export function getAllTags(section: CardSection): string[] {
  const tags = new Set<string>();
  for (const card of sections[section]) {
    for (const tag of card.tags) tags.add(tag);
  }
  return Array.from(tags);
}

/** 각 섹션의 가장 최신 카드 1개 (Home 미리보기용) */
export function getLatestCard(section: CardSection): Card | undefined {
  return getCards(section)[0];
}
