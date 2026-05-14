import { useState } from "react";
import { AuthProvider }  from "./context/AuthContext.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";
import { useToast }      from "./hooks/useToast.js";
import { Shell }         from "./components/layout/Shell.jsx";
import { Toast }         from "./components/ui/Toast.jsx";
import { LoginPage }     from "./pages/LoginPage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { UsersPage }     from "./pages/UsersPage.jsx";
import { UserFormPage }  from "./pages/UserFormPage.jsx";

function Router() {
  const [page,        setPage]        = useState("dashboard");
  const [editingUser, setEditingUser] = useState(null);
  const { toast, show: showToast }    = useToast();

  const goTo = (p) => setPage(p);

  const handleAddSuccess  = ()     => { showToast("User added successfully"); goTo("users"); };
  const handleEditSuccess = ()     => { showToast("User updated successfully"); goTo("users"); };
  const handleOpenEdit    = (user) => { setEditingUser(user); goTo("edit-user"); };
  const handleOpenAdd     = ()     => { setEditingUser(null); goTo("add-user"); };

  return (
    <Shell page={page} setPage={goTo}>
      {page === "dashboard" && <DashboardPage setPage={goTo} />}
      {page === "users"     && <UsersPage onAdd={handleOpenAdd} onEdit={handleOpenEdit} />}
      {page === "add-user"  && <UserFormPage user={null}        onSuccess={handleAddSuccess}  onCancel={() => goTo("users")} />}
      {page === "edit-user" && <UserFormPage user={editingUser} onSuccess={handleEditSuccess} onCancel={() => goTo("users")} />}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </Shell>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "var(--color-background-tertiary)", color: "var(--color-text-primary)" }}>
      <AuthProvider>
        {!authed ? (
          <LoginPage onSuccess={() => setAuthed(true)} />
        ) : (
          <UsersProvider>
            <Router />
          </UsersProvider>
        )}
      </AuthProvider>
    </div>
  );
}
