import type { Card } from "../types/card";
import { formatDateLabel } from "../lib/format";

interface Props {
  card: Card;
}

export default function CardItem({ card }: Props) {
  const content = (
    <>
      <div className="card-item__date">{formatDateLabel(card.date)}</div>
      <h3 className="card-item__title">{card.title}</h3>
      <div className="card-item__tags">
        {card.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p className="card-item__summary">{card.summary}</p>
      {card.link && <span className="card-item__link">더 보기 →</span>}
    </>
  );

  if (card.link) {
    return (
      <a
        className="card-item"
        href={card.link}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    );
  }

  return <article className="card-item">{content}</article>;
}
