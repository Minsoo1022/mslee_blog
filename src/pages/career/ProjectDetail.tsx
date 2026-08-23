import { Link, Navigate, useParams } from "react-router-dom";
import { getProjectById } from "../../lib/loadGraduate";
import { renderMarkdown } from "../../lib/markdown";
import { formatDateLabel } from "../../lib/format";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return <Navigate to="/career/graduate" replace />;
  }

  const dateLabel = project.endDate
    ? `${formatDateLabel(project.startDate)} – ${formatDateLabel(project.endDate)}`
    : `${formatDateLabel(project.startDate)} – 진행중`;

  return (
    <div className="page">
      <div className="page-header">
        <span
          className={
            project.status === "진행중"
              ? "project-card__badge project-card__badge--active"
              : "project-card__badge project-card__badge--done"
          }
        >
          {project.status}
        </span>
        <h1>{project.title}</h1>
        <p className="page-sub">{dateLabel}</p>
      </div>

      <div
        className="card-detail__body surface-light"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(project.body ?? project.summary) }}
      />

      <div className="card-detail__footer">
        <Link to="/career/graduate" className="card-detail__back">
          ← 대학원 페이지로
        </Link>
      </div>
    </div>
  );
}
