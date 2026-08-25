import { Navigate, useParams } from "react-router-dom";
import { getResearchTrackById } from "../../lib/loadResearch";
import ResearchNavCard from "../../components/ResearchNavCard";

const navItems = [
  { path: "progress", title: "연구 진행 상황", description: "스크리닝부터 현재 미해결 질문까지" },
  { path: "methods", title: "분석법", description: "어떤 측정을 왜, 어떻게 해석했는가" },
  { path: "papers", title: "관련 논문", description: "참고한 핵심 문헌" },
  { path: "news", title: "관련 뉴스", description: "업계 동향과 내 연구의 연결점" },
  { path: "updates", title: "격주 업데이트", description: "2주 단위 진행 기록" },
];

export default function ResearchTrackOverview() {
  const { trackId } = useParams<{ trackId: string }>();
  const track = trackId ? getResearchTrackById(trackId) : undefined;

  if (!track) {
    return <Navigate to="/career/graduate" replace />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <span className="project-card__badge project-card__badge--active">{track.status}</span>
        <h1>{track.title}</h1>
        <p className="page-sub">{track.subtitle}</p>
        <p className="page-sub">타겟: {track.target}</p>
      </div>

      <section className="panel">
        <h2>연구 질문</h2>
        <p className="project-card__summary">{track.researchQuestion}</p>
      </section>

      <section>
        <h2 className="section-title">더 보기</h2>
        <div className="summary-grid">
          {navItems.map((item) => (
            <ResearchNavCard
              key={item.path}
              to={`/career/graduate/research/${track.id}/${item.path}`}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
