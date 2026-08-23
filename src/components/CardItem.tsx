import { Link } from "react-router-dom";
import type { Card, CardSection } from "../types/card";
import { formatDateLabel } from "../lib/format";
import { resolveImage } from "../lib/loadImages";
import ImageFallbackIcon from "./ImageFallbackIcon";

interface Props {
  card: Card;
  section: CardSection;
}

export default function CardItem({ card, section }: Props) {
  const imageUrl = resolveImage(card.image);
  const primaryTag = card.tags[0];

  return (
    <Link to={`/${section}/${card.id}`} className="card-item">
      <div className="card-item__media">
        {imageUrl ? (
          <img src={imageUrl} alt="" loading="lazy" />
        ) : (
          <div className="card-item__media-fallback">
            <ImageFallbackIcon />
          </div>
        )}
        {primaryTag && <span className="card-item__badge">{primaryTag}</span>}
      </div>
      <div className="card-item__body">
        <div className="card-item__date">{formatDateLabel(card.date)}</div>
        <h3 className="card-item__title">{card.title}</h3>
        <p className="card-item__summary">{card.summary}</p>
        <span className="card-item__link">자세히 보기 →</span>
      </div>
    </Link>
  );
}
