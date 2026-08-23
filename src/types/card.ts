export type CardSection = "insights" | "career" | "life";

export interface Card {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  title: string;
  tags: string[];
  summary: string;
  body?: string;
  link?: string;
}
