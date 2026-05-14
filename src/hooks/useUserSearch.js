import { useState, useMemo } from "react";

export function useUserSearch(users = []) {
  const [query,        setQuery]        = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(u => {
      const matchQuery =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      const matchStatus =
        statusFilter === "All" || u.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [users, query, statusFilter]);

  return { query, setQuery, statusFilter, setStatusFilter, filtered };
}
