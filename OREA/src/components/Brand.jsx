export function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#top" aria-label="OREA India home">
      <img src="/orea-logo.png" alt="Orea — Sofas & more." />
    </a>
  );
}
