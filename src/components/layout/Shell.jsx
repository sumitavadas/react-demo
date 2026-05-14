import { useAuth } from "../../context/AuthContext.jsx";

function DashIcon({ size = 16, active }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 16 16">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity={active ? 1 : 0.5} />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity={active ? 0.6 : 0.35} />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity={active ? 0.6 : 0.35} />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity={active ? 1 : 0.5} />
    </svg>
  );
}

function UsersIcon({ size = 16, active }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 16 16">
      <circle cx="6" cy="5" r="3" fill="currentColor" opacity={active ? 1 : 0.5} />
      <path d="M1 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={active ? 1 : 0.5} />
      <circle cx="12" cy="5" r="2.5" fill="currentColor" opacity={active ? 0.6 : 0.35} />
      <path d="M13.5 12c.96.5 1.5 1.38 1.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={active ? 0.6 : 0.35} />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", Icon: DashIcon },
  { id: "users",     label: "Users",     Icon: UsersIcon },
];

export function Shell({ children, page, setPage }) {
  const { currentUser, logout } = useAuth();

  const isUsersSection = page === "users" || page === "add-user" || page === "edit-user";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{
        width: 220, flexShrink: 0,
        background: "var(--color-background-primary)",
        borderRight: "0.5px solid var(--color-border-tertiary)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "28px 24px 20px", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#378ADD", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
                <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity=".6" />
                <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity=".6" />
                <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em" }}>AdminKit</span>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = id === "dashboard" ? page === "dashboard" : isUsersSection;
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  width: "100%", padding: "9px 12px", marginBottom: 2,
                  borderRadius: "var(--border-radius-md)", border: "none",
                  background: active ? "var(--color-background-info)" : "transparent",
                  color: active ? "var(--color-text-info)" : "var(--color-text-secondary)",
                  fontWeight: active ? 500 : 400, fontSize: 14,
                  cursor: "pointer", textAlign: "left",
                }}
              >
                <Icon size={16} active={active} />
                {label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "16px 12px", borderTop: "0.5px solid var(--color-border-tertiary)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: "8px 12px" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#E6F1FB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#0C447C" }}>AU</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Admin User</div>
              <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentUser?.email}</div>
            </div>
          </div>
          <button
            onClick={logout}
            style={{ width: "100%", padding: "8px 12px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", background: "transparent", color: "var(--color-text-secondary)", fontSize: 13, cursor: "pointer", textAlign: "left" }}
          >
            Sign out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}
