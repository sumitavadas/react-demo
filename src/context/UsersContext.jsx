import { createContext, useContext, useEffect } from "react";
import { useUsersStore } from "../store/usersStore.js";

const UsersContext = createContext(null);

export function UsersProvider({ children }) {
  const store = useUsersStore();

  useEffect(() => {
    store.fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={store}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used inside <UsersProvider>");
  return ctx;
};
