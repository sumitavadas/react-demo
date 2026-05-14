export function DeleteConfirmModal({ user, onConfirm, onCancel }) {
  if (!user) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "28px 32px", maxWidth: 380, width: "90%" }}>
        <h3 style={{ fontSize: 16, fontWeight: 500, margin: "0 0 10px" }}>Remove user?</h3>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 24px" }}>
          This will permanently remove <strong>{user.name}</strong> from the system.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ padding: "8px 16px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", background: "transparent", color: "var(--color-text-secondary)", fontSize: 14, cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ padding: "8px 16px", border: "none", borderRadius: "var(--border-radius-md)", background: "#E24B4A", color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
