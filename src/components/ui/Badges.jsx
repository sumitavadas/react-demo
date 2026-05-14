export function StatusBadge({ status }) {
  const active = status === "Active";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 9px", borderRadius: 99, fontSize: 12, fontWeight: 500,
      background: active ? "#E1F5EE" : "#F1EFE8",
      color:      active ? "#085041" : "#5F5E5A",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
        background: active ? "#1D9E75" : "#888780" }} />
      {status}
    </span>
  );
}

export function RoleBadge({ role }) {
  const map = {
    Admin:  ["#EEEDFE", "#3C3489"],
    Editor: ["#E6F1FB", "#0C447C"],
    Viewer: ["#F1EFE8", "#444441"],
  };
  const [bg, color] = map[role] ?? map.Viewer;
  return (
    <span style={{
      display: "inline-block", padding: "3px 9px",
      borderRadius: 99, fontSize: 12, fontWeight: 500,
      background: bg, color,
    }}>
      {role}
    </span>
  );
}
