import { useMemo, useState } from "react";
import CardGrid from "../components/CardGrid";
import TagFilter from "../components/TagFilter";
import { getAllTags, getCards } from "../lib/loadCards";
import { careerChecklist, graduationDate, roadmapStages } from "../data/careerConfig";
import { daysUntil } from "../lib/format";

export default function Career() {
  const allCards = getCards("career");
  const allTags = getAllTags("career");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filtered = useMemo(() => {
    if (selected.length === 0) return allCards;
    return allCards.filter((c) => c.tags.some((t) => selected.includes(t)));
  }, [allCards, selected]);

  const dDay = daysUntil(graduationDate);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Career</h1>
        <p className="page-sub">인생 로드맵과 KIST 대학원 생활 기록</p>
      </div>

      <section className="panel">
        <h2>인생 로드맵</h2>
        <div className="roadmap">
          {roadmapStages.map((stage) => (
            <div key={stage.title} className="roadmap__stage">
              <div className="roadmap__age">{stage.ageRange}</div>
              <div className="roadmap__title">{stage.title}</div>
              <p className="roadmap__desc">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>졸업까지 D-day</h2>
        <div className="dday">
          <span className="dday__value">
            {dDay >= 0 ? `D-${dDay}` : `D+${-dDay}`}
          </span>
          <span className="dday__sub">목표일 {graduationDate} (임시값 — 확정 시 수정)</span>
        </div>
      </section>

      <section className="panel">
        <h2>영어/자격증 체크리스트</h2>
        <ul className="checklist">
          {careerChecklist.map((item) => (
            <li key={item.id} className={item.done ? "checklist__item checklist__item--done" : "checklist__item"}>
              <span className="checklist__box">{item.done ? "✓" : ""}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="section-title">연구/커리어 기록</h2>
        <TagFilter tags={allTags} selected={selected} onToggle={toggle} />
        <CardGrid cards={filtered} />
      </section>
    </div>
  );
}
