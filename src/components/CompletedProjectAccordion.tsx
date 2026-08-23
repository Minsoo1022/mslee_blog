import { Link } from "react-router-dom";
import type { GraduateProject } from "../types/graduate";
import { formatDateLabel } from "../lib/format";

interface Props {
  project: GraduateProject;
}

export default function CompletedProjectAccordion({ project }: Props) {
  const dateLabel = project.endDate
    ? `${formatDateLabel(project.startDate)} – ${formatDateLabel(project.endDate)}`
    : formatDateLabel(project.startDate);

  return (
    <details className="accordion-item">
      <summary className="accordion-summary">
        <span className="project-card__badge project-card__badge--done">완료</span>
        <span className="accordion-summary__title">{project.title}</span>
        <span className="accordion-summary__dates">{dateLabel}</span>
      </summary>
      <div className="accordion-body">
        <p className="project-card__summary">{project.summary}</p>
        <Link to={`/career/graduate/project/${project.id}`} className="card-item__link">
          자세히 보기 →
        </Link>
      </div>
    </details>
  );
}
