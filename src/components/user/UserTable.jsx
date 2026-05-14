import { StatusBadge, RoleBadge } from "../ui/Badges.jsx";
import { initials, avatarColor } from "../../utils/avatar.js";

export function UserTable({ users, onEdit, onDelete }) {
  return (
    <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "35%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "19%" }} />
        </colgroup>
        <thead>
          <tr style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", background: "var(--color-background-secondary)" }}>
            {["User", "Department", "Role", "Status", "Actions"].map(h => (
              <th key={h} style={{ padding: "11px 16px", fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: "40px 16px", textAlign: "center", color: "var(--color-text-tertiary)", fontSize: 14 }}>
                No users found
              </td>
            </tr>
          )}
          {users.map((user, i) => (
            <tr key={user.id} style={{ borderBottom: i < users.length - 1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: avatarColor(user.id) + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: avatarColor(user.id) }}>
                    {initials(user.name)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--color-text-secondary)" }}>{user.dept}</td>
              <td style={{ padding: "14px 16px" }}><RoleBadge role={user.role} /></td>
              <td style={{ padding: "14px 16px" }}><StatusBadge status={user.status} /></td>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => onEdit(user)} style={{ padding: "5px 10px", fontSize: 12, border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer" }}>
                    Edit
                  </button>
                  <button onClick={() => onDelete(user)} style={{ padding: "5px 10px", fontSize: 12, border: "0.5px solid var(--color-border-danger)", borderRadius: "var(--border-radius-md)", background: "transparent", color: "var(--color-text-danger)", cursor: "pointer" }}>
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
