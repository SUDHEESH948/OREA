import { Icon } from "./Icon";
import { IMG } from "../data/furnitureData";

export function Hero({ onExplore, onDiscoverStory }) {
  return (
    <>
      <section className="hero">
        <img
          src={IMG.hero}
          alt="Luxurious modern living room with sculpted natural wood and soft sectional sofa"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow light">NEW SEASON · THE ARCHITECTURAL EDIT</span>
          <h1>
            Elevate Your Space.
            <br />
            Experience Timeless Furniture.
          </h1>
          <p>
            Discover thoughtfully crafted furniture that combines timeless elegance, exceptional
            comfort and modern living.
          </p>
          <div className="button-row">
            <button className="button button-light" onClick={onExplore}>
              Explore Collection <Icon name="arrow" size={17} />
            </button>
            <button className="button button-ghost" onClick={onDiscoverStory}>
              Discover Our Story
            </button>
          </div>
        </div>
        <div className="hero-index">
          <span>01</span>
          <i />
          <span>03</span>
        </div>
        <a href="#categories" className="scroll-cue">
          DISCOVER <span>↓</span>
        </a>
      </section>

      <section className="intro reveal">
        <span className="eyebrow">FURNITURE FOR THE WAY YOU LIVE</span>
        <h2>
          Thoughtful design. Inviting comfort.
          <br />
          Made for beautiful Indian homes.
        </h2>
        <p>
          Explore furniture that balances contemporary silhouettes with warmth, character and
          everyday ease. Kiln-dried solid timbers, tactile natural fabrics, and bespoke craftsmanship.
        </p>
      </section>
    </>
  );
}
