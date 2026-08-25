import { Link, Navigate, useParams } from "react-router-dom";
import { getResearchTrackById, getMethodsByTrack } from "../../lib/loadResearch";
import type { ResearchTrackId } from "../../types/graduate";

export default function ResearchMethods() {
  const { trackId } = useParams<{ trackId: string }>();
  const track = trackId ? getResearchTrackById(trackId) : undefined;

  if (!track) {
    return <Navigate to="/career/graduate" replace />;
  }

  const methods = getMethodsByTrack(track.id as ResearchTrackId);

  return (
    <div className="page">
      <div className="page-header">
        <h1>분석법</h1>
        <p className="page-sub">{track.title}</p>
      </div>

      {methods.length > 0 ? (
        <div className="card-grid">
          {methods.map((method) => (
            <div key={method.id} className="card-item">
              <div className="card-item__body">
                <h3 className="card-item__title">{method.name}</h3>
                <p className="card-item__summary">
                  <strong>무엇을 측정하나</strong> — {method.whatItMeasures}
                </p>
                <p className="card-item__summary">
                  <strong>왜 썼나</strong> — {method.whyUsed}
                </p>
                <p className="card-item__summary">
                  <strong>어떻게 해석했나</strong> — {method.howInterpreted}
                </p>
                {method.keyResult && (
                  <p style={{ color: "var(--color-gold)", fontWeight: 600, marginTop: 8 }}>
                    {method.keyResult}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="page-sub">아직 등록된 분석법이 없습니다.</p>
      )}

      <div className="card-detail__footer">
        <Link to={`/career/graduate/research/${track.id}`} className="card-detail__back">
          ← 개요로
        </Link>
      </div>
    </div>
  );
}
