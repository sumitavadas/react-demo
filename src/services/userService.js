const INITIAL_USERS = [
  { id: 1, name: "Priya Sharma",  email: "priya@acme.com",   role: "Admin",  status: "Active",   joined: "2024-01-15", dept: "Engineering" },
  { id: 2, name: "Rohan Mehta",   email: "rohan@acme.com",   role: "Editor", status: "Active",   joined: "2024-03-22", dept: "Product"     },
  { id: 3, name: "Ananya Iyer",   email: "ananya@acme.com",  role: "Viewer", status: "Inactive", joined: "2024-05-10", dept: "Design"      },
  { id: 4, name: "Karan Patel",   email: "karan@acme.com",   role: "Editor", status: "Active",   joined: "2024-07-01", dept: "Marketing"   },
  { id: 5, name: "Sneha Nair",    email: "sneha@acme.com",   role: "Viewer", status: "Active",   joined: "2025-01-18", dept: "Engineering" },
];

let _users = [...INITIAL_USERS];
let _nextId = 6;

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const userService = {
  async getAll() {
    await delay();
    return [..._users];
  },

  async getById(id) {
    await delay(150);
    const user = _users.find(u => u.id === id);
    if (!user) throw new Error(`User ${id} not found`);
    return { ...user };
  },

  async create(data) {
    await delay();
    const newUser = {
      ...data,
      id: _nextId++,
      joined: new Date().toISOString().split("T")[0],
      status: "Active",
    };
    _users = [..._users, newUser];
    return { ...newUser };
  },

  async update(id, data) {
    await delay();
    const idx = _users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error(`User ${id} not found`);
    _users = _users.map(u => (u.id === id ? { ...u, ...data } : u));
    return { ..._users[idx] };
  },

  async remove(id) {
    await delay(200);
    const user = _users.find(u => u.id === id);
    if (!user) throw new Error(`User ${id} not found`);
    _users = _users.filter(u => u.id !== id);
    return { id };
  },
};
