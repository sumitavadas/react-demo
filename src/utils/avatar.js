const AVATAR_COLORS = ["#378ADD", "#1D9E75", "#D85A30", "#7F77DD", "#BA7517"];

export function initials(name = "") {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

export function avatarColor(id) {
  return AVATAR_COLORS[(id - 1) % AVATAR_COLORS.length];
}
