import { Link, Navigate, useParams } from "react-router-dom";
import { getResearchTrackById, getPapersByTrack } from "../../lib/loadResearch";
import type { ResearchTrackId } from "../../types/graduate";
import PaperCard from "../../components/PaperCard";

export default function ResearchPapers() {
  const { trackId } = useParams<{ trackId: string }>();
  const track = trackId ? getResearchTrackById(trackId) : undefined;

  if (!track) {
    return <Navigate to="/career/graduate" replace />;
  }

  const papers = getPapersByTrack(track.id as ResearchTrackId);

  return (
    <div className="page">
      <div className="page-header">
        <h1>관련 논문</h1>
        <p className="page-sub">{track.title}</p>
      </div>

      {papers.length > 0 ? (
        <div className="card-grid">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        <p className="page-sub">아직 등록된 논문이 없습니다.</p>
      )}

      <div className="card-detail__footer">
        <Link to={`/career/graduate/research/${track.id}`} className="card-detail__back">
          ← 개요로
        </Link>
      </div>
    </div>
  );
}
