import GraduateProjectCard from "../../components/GraduateProjectCard";
import CompletedProjectAccordion from "../../components/CompletedProjectAccordion";
import ResearchTrackCard from "../../components/ResearchTrackCard";
import { getCompletedProjects, getInProgressProjects } from "../../lib/loadGraduate";
import { getResearchTracks } from "../../lib/loadResearch";
import { admissionLabel, graduationDate, researchFocus } from "../../data/careerConfig";
import { daysUntil } from "../../lib/format";

export default function Graduate() {
  const tracks = getResearchTracks();
  const inProgress = getInProgressProjects();
  const completed = getCompletedProjects();
  const dDay = daysUntil(graduationDate);

  return (
    <div className="page">
      <div className="page-header">
        <h1>KIST 대학원 생활</h1>
        <p className="page-sub">
          {admissionLabel} · {researchFocus}
        </p>
      </div>

      <section className="panel">
        <h2>졸업까지 D-day</h2>
        <div className="dday">
          <span className="dday__value">
            {dDay >= 0 ? `D-${dDay}` : `D+${-dDay}`}
          </span>
          <span className="dday__sub">목표일 {graduationDate} (임시값 — 확정 시 수정)</span>
        </div>
      </section>

      <section>
        <h2 className="section-title">내 연구</h2>
        <p className="page-sub" style={{ marginBottom: 16 }}>
          GMS 도전재 기반 두 갈래 연구
        </p>
        {tracks.length > 0 ? (
          <div className="project-grid">
            {tracks.map((track) => (
              <ResearchTrackCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <p className="page-sub">등록된 연구 트랙이 없습니다.</p>
        )}
      </section>

      <section>
        <h2 className="section-title">부가 프로젝트</h2>
        <p className="page-sub" style={{ marginBottom: 16 }}>
          핵심 연구 트랙 외에 진행하는 부가 프로젝트 (예: GT 습식공정정립화 등)
        </p>

        <h3>진행 중</h3>
        {inProgress.length > 0 ? (
          <div className="project-grid">
            {inProgress.map((p) => (
              <GraduateProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="page-sub">진행 중인 프로젝트가 없습니다.</p>
        )}

        <h3>완료</h3>
        {completed.length > 0 ? (
          <div className="accordion-list">
            {completed.map((p) => (
              <CompletedProjectAccordion key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="page-sub">완료한 프로젝트가 아직 없습니다.</p>
        )}
      </section>
    </div>
  );
}
