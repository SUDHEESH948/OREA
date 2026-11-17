import { Icon } from "./Icon";

export function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-${toast.type || "info"}`}>
          <div className="toast-icon">
            {toast.type === "success" && <Icon name="check" size={16} />}
            {toast.type === "wishlist" && <Icon name="heart" size={16} filled />}
            {toast.type === "cart" && <Icon name="bag" size={16} />}
            {(!toast.type || toast.type === "info") && <Icon name="arrow" size={16} />}
          </div>
          <div className="toast-content">
            <strong>{toast.title}</strong>
            {toast.message && <p>{toast.message}</p>}
          </div>
          <button
            className="toast-close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
