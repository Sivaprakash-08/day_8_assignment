const categories = [
  { label: 'All', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Jewelery', value: 'jewelery' },
  { label: "Men's clothing", value: "men's clothing" },
  { label: "Women's clothing", value: "women's clothing" },
];

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="category-chips" aria-label="Filter by category">
      {categories.map((category) => (
        <button key={category.value} className={`category-chip ${selected === category.value ? 'selected' : ''}`}
          onClick={() => onChange(category.value)} aria-pressed={selected === category.value}>
          {category.label}
        </button>
      ))}
    </div>
  );
}
