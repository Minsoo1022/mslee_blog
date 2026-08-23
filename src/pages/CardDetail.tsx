import { Link, Navigate, useParams } from "react-router-dom";
import type { CardSection } from "../types/card";
import { getCardById, getRelatedCards } from "../lib/loadCards";
import { resolveImage } from "../lib/loadImages";
import { renderMarkdown } from "../lib/markdown";
import { formatDateLabel } from "../lib/format";
import ImageFallbackIcon from "../components/ImageFallbackIcon";
import CardItem from "../components/CardItem";

const sectionLabel: Record<CardSection, string> = {
  insights: "Insights",
  career: "Career",
  life: "Life",
};

interface Props {
  section: CardSection;
}

export default function CardDetail({ section }: Props) {
  const { id } = useParams<{ id: string }>();
  const card = id ? getCardById(section, id) : undefined;

  if (!card) {
    return <Navigate to={`/${section}`} replace />;
  }

  const imageUrl = resolveImage(card.image);
  const related = getRelatedCards(section, card);

  return (
    <div className="page card-detail">
      <div className="card-detail__hero">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="card-detail__hero-media" />
        ) : (
          <div className="card-detail__hero-media card-detail__hero-media--fallback">
            <ImageFallbackIcon />
          </div>
        )}
        <div className="card-detail__hero-overlay" />
        <div className="card-detail__hero-text">
          <div className="card-detail__tags">
            {card.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="card-detail__title">{card.title}</h1>
          <div className="card-detail__date">{formatDateLabel(card.date)}</div>
        </div>
      </div>

      <div
        className="card-detail__body surface-light"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(card.body) }}
      />

      <div className="card-detail__footer">
        <Link to={`/${section}`} className="card-detail__back">
          ← {sectionLabel[section]} 목록으로
        </Link>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="section-title">관련 카드</h2>
          <div className="card-grid">
            {related.map((r) => (
              <CardItem key={r.id} card={r} section={section} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
