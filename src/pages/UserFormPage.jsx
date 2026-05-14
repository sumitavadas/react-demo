import { useUsers }    from "../context/UsersContext.jsx";
import { useUserForm } from "../hooks/useUserForm.js";
import { Field }       from "../components/ui/Field.jsx";
import { initials, avatarColor } from "../utils/avatar.js";

export function UserFormPage({ user, onSuccess, onCancel }) {
  const { addUser, updateUser, saving } = useUsers();
  const { form, errors, handleChange, validateForm } = useUserForm(user);
  const isEdit = !!user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isEdit) {
      await updateUser(user.id, form);
    } else {
      await addUser(form);
    }
    onSuccess();
  };

  return (
    <div style={{ padding: "32px 36px", maxWidth: 600, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <button onClick={onCancel} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--color-text-secondary)", border: "none", background: "transparent", cursor: "pointer", padding: "0 0 16px", marginBottom: 4 }}>
          ← Back to users
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
          {isEdit ? "Edit user" : "Add user"}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: 14, margin: 0 }}>
          {isEdit ? `Editing ${user.name}` : "Create a new team member"}
        </p>
      </div>

      <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "28px 32px" }}>
        {isEdit && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, paddingBottom: 24, borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0, background: avatarColor(user.id) + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: avatarColor(user.id) }}>
              {initials(user.name)}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{user.name}</div>
              <div style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>Joined {user.joined}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <Field label="Full name" error={errors.name}>
              <input
                name="name" value={form.name}
                onChange={handleChange}
                placeholder="Priya Sharma"
                style={{ width: "100%", boxSizing: "border-box", borderColor: errors.name ? "var(--color-border-danger)" : undefined }}
              />
            </Field>
            <Field label="Email address" error={errors.email}>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange}
                placeholder="priya@company.com"
                style={{ width: "100%", boxSizing: "border-box", borderColor: errors.email ? "var(--color-border-danger)" : undefined }}
              />
            </Field>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <Field label="Department" error={errors.dept}>
              <input
                name="dept" value={form.dept}
                onChange={handleChange}
                placeholder="Engineering"
                style={{ width: "100%", boxSizing: "border-box", borderColor: errors.dept ? "var(--color-border-danger)" : undefined }}
              />
            </Field>
            <Field label="Role">
              <select name="role" value={form.role} onChange={handleChange} style={{ width: "100%", boxSizing: "border-box" }}>
                <option>Viewer</option>
                <option>Editor</option>
                <option>Admin</option>
              </select>
            </Field>
          </div>

          {isEdit && (
            <div style={{ marginBottom: 16 }}>
              <Field label="Status">
                <select name="status" value={form.status} onChange={handleChange} style={{ width: "100%", boxSizing: "border-box" }}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </Field>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24, paddingTop: 20, borderTop: "0.5px solid var(--color-border-tertiary)" }}>
            <button type="button" onClick={onCancel} style={{ padding: "9px 20px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", background: "transparent", color: "var(--color-text-secondary)", fontSize: 14, cursor: "pointer" }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ padding: "9px 24px", background: "#378ADD", color: "white", border: "none", borderRadius: "var(--border-radius-md)", fontSize: 14, fontWeight: 500, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving…" : isEdit ? "Save changes" : "Add user"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
