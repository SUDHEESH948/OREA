import { Icon } from "./Icon";
import { categories } from "../data/furnitureData";

export function Categories({ onSelectCategory }) {
  return (
    <section id="categories" className="section category-section reveal">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CURATED SPACES</span>
          <h2>Shop by Category</h2>
        </div>
        <button
          className="text-link"
          onClick={() => onSelectCategory("All")}
        >
          View all categories <Icon name="arrow" size={16} />
        </button>
      </div>

      <div className="category-grid">
        {categories.map((cat, i) => (
          <div
            className={`category-card ${i === 0 || i === 7 ? "wide" : ""}`}
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelectCategory(cat.name);
            }}
          >
            <img src={cat.image} alt={`${cat.name} furniture collection`} loading="lazy" />
            <div className="image-shade" />
            <div className="category-card-overlay">
              <small className="cat-count-badge">{cat.itemsCount} Pieces</small>
              <h3>{cat.name}</h3>
              <p className="cat-desc">{cat.description}</p>
              <span className="cat-cta">
                Explore Collection <Icon name="arrow" size={15} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
