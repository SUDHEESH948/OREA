export function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#top" aria-label="OREA — Sofas & more">
      <img
        src={light ? "/orea-logo-light.png" : "/orea-logo.png"}
        alt="OREA — Sofas & more"
        width="160"
        height="50"
      />
    </a>
  );
}
