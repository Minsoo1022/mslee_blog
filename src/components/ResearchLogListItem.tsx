import { Link } from "react-router-dom";
import type { ResearchLogEntry } from "../types/graduate";
import { formatDateLabel } from "../lib/format";

interface Props {
  entry: ResearchLogEntry;
}

export default function ResearchLogListItem({ entry }: Props) {
  const preview = entry.completed.slice(0, 2);

  return (
    <Link to={`/career/graduate/log/${entry.id}`} className="log-item">
      <div className="log-item__period">
        {formatDateLabel(entry.periodStart)} ~ {formatDateLabel(entry.periodEnd)}
      </div>
      <h3 className="log-item__title">{entry.title}</h3>
      <ul className="log-item__preview">
        {preview.map((item) => (
          <li key={item}>{item}</li>
        ))}
        {entry.completed.length > preview.length && <li>…</li>}
      </ul>
      <span className="card-item__link">자세히 보기 →</span>
    </Link>
  );
}
