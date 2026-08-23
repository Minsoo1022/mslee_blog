import type { Card, CardSection } from "../types/card";
import CardItem from "./CardItem";

interface Props {
  cards: Card[];
  section: CardSection;
}

export default function CardGrid({ cards, section }: Props) {
  if (cards.length === 0) {
    return <p className="page-sub">해당하는 카드가 없습니다.</p>;
  }

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} section={section} />
      ))}
    </div>
  );
}
