import { useMemo, useState } from "react";
import CardGrid from "../components/CardGrid";
import TagFilter from "../components/TagFilter";
import { getAllTags, getCards } from "../lib/loadCards";

export default function Life() {
  const allCards = getCards("life");
  const allTags = getAllTags("life");
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

  return (
    <div className="page">
      <div className="page-header">
        <h1>Life</h1>
        <p className="page-sub">여행, 운동 등 개인 기록</p>
      </div>

      <TagFilter tags={allTags} selected={selected} onToggle={toggle} />
      <CardGrid cards={filtered} section="life" />
    </div>
  );
}
