import { useState } from "react";
import { useUsers }      from "../context/UsersContext.jsx";
import { useUserSearch } from "../hooks/useUserSearch.js";
import { UserTable }     from "../components/user/UserTable.jsx";
import { DeleteConfirmModal } from "../components/user/DeleteConfirmModal.jsx";

export function UsersPage({ onAdd, onEdit }) {
  const { users, loading, removeUser } = useUsers();
  const { query, setQuery, statusFilter, setStatusFilter, filtered } = useUserSearch(users);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await removeUser(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div style={{ padding: "32px 36px", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Users</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14, margin: 0 }}>{users.length} total members</p>
        </div>
        <button onClick={onAdd} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "#378ADD", color: "white", border: "none", borderRadius: "var(--border-radius-md)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add user
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Search by name or email…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 140 }}>
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-text-tertiary)", fontSize: 14 }}>Loading…</div>
      ) : (
        <UserTable
          users={filtered}
          onEdit={onEdit}
          onDelete={setDeleteTarget}
        />
      )}

      <DeleteConfirmModal
        user={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
