import { Link, Navigate, useParams } from "react-router-dom";
import { getResearchTrackById, getProgressByTrack } from "../../lib/loadResearch";
import type { ResearchTrackId } from "../../types/graduate";

export default function ResearchProgress() {
  const { trackId } = useParams<{ trackId: string }>();
  const track = trackId ? getResearchTrackById(trackId) : undefined;

  if (!track) {
    return <Navigate to="/career/graduate" replace />;
  }

  const stages = getProgressByTrack(track.id as ResearchTrackId);

  return (
    <div className="page">
      <div className="page-header">
        <h1>연구 진행 상황</h1>
        <p className="page-sub">{track.title}</p>
      </div>

      {stages.length > 0 ? (
        stages.map((stage) => (
          <section key={stage.id} className="panel">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span
                style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}
              >
                {stage.label}
              </span>
              <span
                className="tag"
                style={
                  stage.status === "완료"
                    ? { borderColor: "var(--color-positive-on-navy)", color: "var(--color-positive-on-navy)" }
                    : undefined
                }
              >
                {stage.status}
              </span>
            </div>
            <h2>{stage.heading}</h2>
            {stage.body.split("\n\n").map((para) => (
              <p key={para} className="project-card__summary">
                {para}
              </p>
            ))}
          </section>
        ))
      ) : (
        <p className="page-sub">아직 등록된 진행 상황이 없습니다.</p>
      )}

      <div className="card-detail__footer">
        <Link to={`/career/graduate/research/${track.id}`} className="card-detail__back">
          ← 개요로
        </Link>
      </div>
    </div>
  );
}
