import type { ResearchPaper } from "../types/graduate";

interface Props {
  paper: ResearchPaper;
}

// 기존 .card-item 톤(제목/배지/요약/화살표 링크)을 그대로 재사용.
// 사진이 없는 카드라 .card-item__media 없이 .card-item__body만 사용.
export default function PaperCard({ paper }: Props) {
  const content = (
    <div className="card-item__body">
      <div className="card-item__date">
        {paper.venue} · {paper.year}
      </div>
      <h3 className="card-item__title">{paper.title}</h3>
      <div className="card-item__tags">
        {paper.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p className="card-item__summary">
        {paper.authors} — {paper.summary}
      </p>
      {paper.url && <span className="card-item__link">원문 보기 →</span>}
    </div>
  );

  if (paper.url) {
    return (
      <a href={paper.url} target="_blank" rel="noreferrer noopener" className="card-item">
        {content}
      </a>
    );
  }

  return <div className="card-item">{content}</div>;
}
