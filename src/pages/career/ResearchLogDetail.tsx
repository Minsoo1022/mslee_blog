import { Link, Navigate, useParams } from "react-router-dom";
import { getResearchLogById } from "../../lib/loadGraduate";
import { resolveImage } from "../../lib/loadImages";
import { formatDateLabel } from "../../lib/format";

export default function ResearchLogDetail() {
  const { id } = useParams<{ id: string }>();
  const entry = id ? getResearchLogById(id) : undefined;

  if (!entry) {
    return <Navigate to="/career/graduate" replace />;
  }

  const imageUrl = resolveImage(entry.image);

  return (
    <div className="page">
      <div className="page-header">
        <h1>{entry.title}</h1>
        <p className="page-sub">
          {formatDateLabel(entry.periodStart)} ~ {formatDateLabel(entry.periodEnd)}
        </p>
      </div>

      <div className="card-detail__body surface-light">
        <h3>완료한 과제</h3>
        <ul>
          {entry.completed.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3>다음 계획</h3>
        <ul>
          {entry.nextSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {imageUrl && (
          <img src={imageUrl} alt="" className="research-log-image" loading="lazy" />
        )}
      </div>

      <div className="card-detail__footer">
        <Link to="/career/graduate" className="card-detail__back">
          ← 대학원 페이지로
        </Link>
      </div>
    </div>
  );
}
