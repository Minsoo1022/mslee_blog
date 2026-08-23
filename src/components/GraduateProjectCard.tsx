import { Link } from "react-router-dom";
import type { GraduateProject } from "../types/graduate";
import { formatDateLabel } from "../lib/format";

interface Props {
  project: GraduateProject;
}

export default function GraduateProjectCard({ project }: Props) {
  const dateLabel = project.endDate
    ? `${formatDateLabel(project.startDate)} – ${formatDateLabel(project.endDate)}`
    : `${formatDateLabel(project.startDate)} –`;

  return (
    <Link to={`/career/graduate/project/${project.id}`} className="project-card">
      <span
        className={
          project.status === "진행중"
            ? "project-card__badge project-card__badge--active"
            : "project-card__badge project-card__badge--done"
        }
      >
        {project.status}
      </span>
      <h3 className="project-card__title">{project.title}</h3>
      <div className="project-card__dates">{dateLabel}</div>
      <p className="project-card__summary">{project.summary}</p>
      <span className="card-item__link">자세히 보기 →</span>
    </Link>
  );
}
