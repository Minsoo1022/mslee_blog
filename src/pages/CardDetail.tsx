import { Link, Navigate, useParams } from "react-router-dom";
import type { CardSection } from "../types/card";
import { getCardById, getRelatedCards } from "../lib/loadCards";
import { resolveImage } from "../lib/loadImages";
import { renderMarkdown } from "../lib/markdown";
import { formatDateLabel } from "../lib/format";
import { pickIconForTags } from "../components/icons";
import CardGrid from "../components/CardGrid";

const sectionLabel: Record<CardSection, string> = {
  insights: "Insights",
  career: "취업 준비",
  life: "Life",
};

interface Props {
  section: CardSection;
  /** 라우트 prefix가 section과 다를 때(예: career job-prep) 지정. 기본값은 section */
  basePath?: string;
}

export default function CardDetail({ section, basePath }: Props) {
  const { id } = useParams<{ id: string }>();
  const card = id ? getCardById(section, id) : undefined;
  const listPath = `/${basePath ?? section}`;

  if (!card) {
    return <Navigate to={listPath} replace />;
  }

  const imageUrl = resolveImage(card.image);
  const related = getRelatedCards(section, card);
  const FallbackIcon = pickIconForTags(card.tags);

  return (
    <div className="page card-detail">
      <div className="card-detail__hero">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="card-detail__hero-media" />
        ) : (
          <div className="card-detail__hero-media card-detail__hero-media--fallback">
            <FallbackIcon className="card-detail__hero-media-fallback-icon" />
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
        <Link to={listPath} className="card-detail__back">
          ← {sectionLabel[section]} 목록으로
        </Link>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="section-title">관련 카드</h2>
          <CardGrid cards={related} section={section} basePath={basePath} />
        </section>
      )}
    </div>
  );
}
