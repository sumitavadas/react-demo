export function Field({ label, error, style, children }) {
  return (
    <div style={style}>
      <label style={{
        display: "block", fontSize: 13, fontWeight: 500,
        color: "var(--color-text-secondary)", marginBottom: 6,
      }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: 12, color: "var(--color-text-danger)", margin: "4px 0 0" }}>
          {error}
        </p>
      )}
    </div>
  );
}
