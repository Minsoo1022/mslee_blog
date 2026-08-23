interface Props {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}

export default function TagFilter({ tags, selected, onToggle }: Props) {
  return (
    <div className="tag-filter">
      {tags.map((tag) => {
        const active = selected.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            className={active ? "tag-filter__btn tag-filter__btn--active" : "tag-filter__btn"}
            onClick={() => onToggle(tag)}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
