import { Link, Navigate, useParams } from "react-router-dom";
import { getResearchTrackById, getLogByTrack } from "../../lib/loadResearch";
import type { ResearchTrackId } from "../../types/graduate";
import { formatYYMMDD } from "../../lib/format";

export default function ResearchUpdates() {
  const { trackId } = useParams<{ trackId: string }>();
  const track = trackId ? getResearchTrackById(trackId) : undefined;

  if (!track) {
    return <Navigate to="/career/graduate" replace />;
  }

  const log = getLogByTrack(track.id as ResearchTrackId);

  return (
    <div className="page">
      <div className="page-header">
        <h1>격주 업데이트</h1>
        <p className="page-sub">{track.title}</p>
      </div>

      {log.length > 0 ? (
        <div className="card-grid">
          {log.map((entry) => (
            <Link key={entry.id} to={`/career/graduate/log/${entry.id}`} className="card-item">
              <div className="card-item__body">
                <div className="card-item__date">{formatYYMMDD(entry.periodEnd)}</div>
                <h3 className="card-item__title">{entry.title}</h3>
                <ul className="log-item__preview">
                  {entry.completed.slice(0, 2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {entry.completed.length > 2 && <li>…</li>}
                </ul>
                <span className="card-item__link">자세히 보기 →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="page-sub">아직 등록된 업데이트가 없습니다.</p>
      )}

      <div className="card-detail__footer">
        <Link to={`/career/graduate/research/${track.id}`} className="card-detail__back">
          ← 개요로
        </Link>
      </div>
    </div>
  );
}
