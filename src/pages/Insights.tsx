import { useMemo, useState } from "react";
import CardGrid from "../components/CardGrid";
import TagFilter from "../components/TagFilter";
import { getAllTags, getCards } from "../lib/loadCards";

export default function Insights() {
  const allCards = getCards("insights");
  const allTags = getAllTags("insights");
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
        <h1>Insights</h1>
        <p className="page-sub">주말에 스타벅스에서 읽고 배운 것들을 카드로 기록</p>
      </div>

      <TagFilter tags={allTags} selected={selected} onToggle={toggle} />
      <CardGrid cards={filtered} section="insights" />
    </div>
  );
}
