import { Link, Navigate, useParams } from "react-router-dom";
import { getResearchTrackById, getNewsByTrack } from "../../lib/loadResearch";
import type { ResearchTrackId } from "../../types/graduate";
import { formatDateLabel } from "../../lib/format";

export default function ResearchNews() {
  const { trackId } = useParams<{ trackId: string }>();
  const track = trackId ? getResearchTrackById(trackId) : undefined;

  if (!track) {
    return <Navigate to="/career/graduate" replace />;
  }

  const news = getNewsByTrack(track.id as ResearchTrackId);

  return (
    <div className="page">
      <div className="page-header">
        <h1>관련 뉴스</h1>
        <p className="page-sub">{track.title}</p>
      </div>

      {news.length > 0 ? (
        <div className="card-grid">
          {news.map((item) => {
            const content = (
              <div className="card-item__body">
                <div className="card-item__date">
                  {formatDateLabel(item.date)} · {item.source}
                </div>
                <h3 className="card-item__title">{item.title}</h3>
                <p className="card-item__summary">{item.summary}</p>
                <p
                  style={{
                    borderLeft: "2px solid var(--color-gold)",
                    paddingLeft: 10,
                    marginTop: 10,
                    fontSize: "0.85rem",
                    color: "var(--color-gold)",
                    fontWeight: 600,
                  }}
                >
                  {item.connection}
                </p>
                <span className="card-item__link">원문 보기 →</span>
              </div>
            );
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer noopener"
                className="card-item"
              >
                {content}
              </a>
            );
          })}
        </div>
      ) : (
        <p className="page-sub">아직 등록된 기사가 없습니다.</p>
      )}

      <div className="card-detail__footer">
        <Link to={`/career/graduate/research/${track.id}`} className="card-detail__back">
          ← 개요로
        </Link>
      </div>
    </div>
  );
}
