import GraduateProjectCard from "../../components/GraduateProjectCard";
import CompletedProjectAccordion from "../../components/CompletedProjectAccordion";
import ResearchLogListItem from "../../components/ResearchLogListItem";
import {
  getCompletedProjects,
  getInProgressProjects,
  getResearchLog,
} from "../../lib/loadGraduate";
import { admissionLabel, graduationDate, researchFocus } from "../../data/careerConfig";
import { daysUntil } from "../../lib/format";

export default function Graduate() {
  const inProgress = getInProgressProjects();
  const completed = getCompletedProjects();
  const log = getResearchLog();
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
        <h2 className="section-title">진행 중 프로젝트</h2>
        {inProgress.length > 0 ? (
          <div className="project-grid">
            {inProgress.map((p) => (
              <GraduateProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="page-sub">진행 중인 프로젝트가 없습니다.</p>
        )}
      </section>

      <section>
        <h2 className="section-title">완료한 프로젝트</h2>
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

      <section>
        <h2 className="section-title">연구 진행 상황 로그</h2>
        <p className="page-sub" style={{ marginBottom: 16 }}>
          박사님께 보내는 격주 bi-weekly 보고 내용을 요약해서 쌓는 기록
        </p>
        {log.length > 0 ? (
          <div className="log-list">
            {log.map((entry) => (
              <ResearchLogListItem key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="page-sub">아직 기록이 없습니다.</p>
        )}
      </section>
    </div>
  );
}
