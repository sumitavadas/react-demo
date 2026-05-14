const MOCK_CREDENTIALS = { email: "admin@demo.com", password: "admin123" };
const SESSION_KEY = "adminkit_session";

const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

export const authService = {
  async login(email, password) {
    await delay();
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      const session = { email, name: "Admin User", token: "mock-jwt-token" };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }
    throw new Error("Invalid email or password");
  },

  async logout() {
    await delay(100);
    sessionStorage.removeItem(SESSION_KEY);
  },

  getSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};
