import { Link } from "react-router-dom";
import type { ResearchTrack } from "../types/graduate";

interface Props {
  track: ResearchTrack;
}

// 기존 .project-card 톤을 그대로 재사용 (title/badge/summary/화살표 링크).
export default function ResearchTrackCard({ track }: Props) {
  return (
    <Link to={`/career/graduate/research/${track.id}`} className="project-card">
      <span className="project-card__badge project-card__badge--active">{track.status}</span>
      <h3 className="project-card__title">{track.title}</h3>
      <div className="project-card__dates">{track.subtitle}</div>
      <p className="project-card__summary">{track.target}</p>
      <span className="card-item__link">자세히 보기 →</span>
    </Link>
  );
}
