export function Toast({ msg, type = "success" }) {
  const isDanger = type === "danger";
  return (
    <div style={{
      position: "fixed", bottom: "2rem", right: "2rem",
      background:   isDanger ? "var(--color-background-danger)"  : "var(--color-background-success)",
      color:        isDanger ? "var(--color-text-danger)"         : "var(--color-text-success)",
      borderColor:  isDanger ? "var(--color-border-danger)"       : "var(--color-border-success)",
      border: "0.5px solid",
      borderRadius: "var(--border-radius-md)",
      padding: "12px 20px", fontSize: 14, fontWeight: 500,
      zIndex: 9999, maxWidth: 320,
    }}>
      {msg}
    </div>
  );
}
