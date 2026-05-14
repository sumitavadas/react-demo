import { useUsers } from "../context/UsersContext.jsx";
import { StatusBadge } from "../components/ui/Badges.jsx";
import { initials, avatarColor } from "../utils/avatar.js";

export function DashboardPage({ setPage }) {
  const { users, loading } = useUsers();

  if (loading) return <Spinner />;

  const active   = users.filter(u => u.status === "Active").length;
  const inactive = users.filter(u => u.status === "Inactive").length;
  const admins   = users.filter(u => u.role === "Admin").length;

  const depts = users.reduce((acc, u) => {
    acc[u.dept] = (acc[u.dept] || 0) + 1;
    return acc;
  }, {});

  const recent = [...users].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div style={{ padding: "32px 36px", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Dashboard</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: 14, margin: 0 }}>Overview of your team</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Total users", value: users.length, color: "#378ADD" },
          { label: "Active",      value: active,       color: "#1D9E75" },
          { label: "Inactive",    value: inactive,     color: "#888780" },
          { label: "Admins",      value: admins,       color: "#7F77DD" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "20px" }}>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 600, color, letterSpacing: "-0.03em" }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "20px 24px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 500, margin: "0 0 16px" }}>Users by department</h3>
          {Object.entries(depts).map(([dept, count]) => (
            <div key={dept} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: "var(--color-text-secondary)" }}>{dept}</span>
                <span style={{ fontWeight: 500 }}>{count}</span>
              </div>
              <div style={{ height: 4, background: "var(--color-background-secondary)", borderRadius: 2 }}>
                <div style={{ height: 4, width: `${Math.round((count / users.length) * 100)}%`, background: "#378ADD", borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>Recently added</h3>
            <button onClick={() => setPage("users")} style={{ fontSize: 12, color: "#378ADD", border: "none", background: "transparent", cursor: "pointer", padding: 0 }}>
              View all →
            </button>
          </div>
          {recent.map(u => (
            <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: avatarColor(u.id) + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: avatarColor(u.id) }}>
                {initials(u.name)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{u.dept} · {u.role}</div>
              </div>
              <StatusBadge status={u.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ padding: "80px 36px", textAlign: "center", color: "var(--color-text-tertiary)", fontSize: 14 }}>
      Loading…
    </div>
  );
}
