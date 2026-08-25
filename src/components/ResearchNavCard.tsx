import { Link } from "react-router-dom";

interface Props {
  to: string;
  title: string;
  description: string;
}

// 기존 .summary-card 톤을 그대로 재사용 (필채움+radius, 보더 없음).
export default function ResearchNavCard({ to, title, description }: Props) {
  return (
    <Link to={to} className="summary-card" style={{ display: "block", textDecoration: "none" }}>
      <div className="summary-card__label">{title}</div>
      <p className="card-item__summary" style={{ margin: "4px 0 0" }}>
        {description}
      </p>
      <span className="card-item__link">자세히 보기 →</span>
    </Link>
  );
}
