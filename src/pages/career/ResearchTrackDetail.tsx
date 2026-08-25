import { Link, Navigate, useParams } from "react-router-dom";
import { getResearchTrackById, getPapersByTrack, getLogByTrack } from "../../lib/loadResearch";
import type { ResearchTrackId } from "../../types/graduate";
import ResearchLogListItem from "../../components/ResearchLogListItem";
import PaperCard from "../../components/PaperCard";

export default function ResearchTrackDetail() {
  const { trackId } = useParams<{ trackId: string }>();
  const track = trackId ? getResearchTrackById(trackId) : undefined;

  if (!track) {
    return <Navigate to="/career/graduate" replace />;
  }

  const papers = getPapersByTrack(track.id as ResearchTrackId);
  const log = getLogByTrack(track.id as ResearchTrackId);

  return (
    <div className="page">
      <div className="page-header">
        <span className="project-card__badge project-card__badge--active">{track.status}</span>
        <h1>{track.title}</h1>
        <p className="page-sub">{track.subtitle}</p>
        <p className="page-sub">타겟: {track.target}</p>
      </div>

      <section className="panel">
        <h2>연구 질문</h2>
        <p className="project-card__summary">{track.researchQuestion}</p>
      </section>

      {track.narrative.map((section) => (
        <section key={section.heading} className="panel">
          <h2>{section.heading}</h2>
          <p className="project-card__summary">{section.body}</p>
        </section>
      ))}

      <section>
        <h2 className="section-title">주간 기록</h2>
        {log.length > 0 ? (
          <div className="log-list">
            {log.map((entry) => (
              <ResearchLogListItem key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="page-sub">아직 이 트랙으로 분류된 주간 기록이 없습니다.</p>
        )}
      </section>

      <section>
        <h2 className="section-title">관련 논문</h2>
        {papers.length > 0 ? (
          <div className="card-grid">
            {papers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        ) : (
          <p className="page-sub">아직 등록된 논문이 없습니다.</p>
        )}
      </section>

      <section>
        <h2 className="section-title">미해결 질문</h2>
        <ul className="checklist">
          {track.openQuestions.map((q) => (
            <li key={q} className="checklist__item">
              <span className="checklist__box" />
              {q}
            </li>
          ))}
        </ul>
      </section>

      <div className="card-detail__footer">
        <Link to="/career/graduate" className="card-detail__back">
          ← 대학원 페이지로
        </Link>
      </div>
    </div>
  );
}
