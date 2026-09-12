const KEYS = {
  users: 'eth_users',
  session: 'eth_session',
  resets: 'eth_resets',
} as const;

interface UserRecord {
  id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  createdAt: number;
}

type Result =
  | { ok: true; user?: UserRecord; code?: string; email?: string; fname?: string }
  | { ok: false; error: string };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota / storage errors */
  }
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || '').trim());
}

function users(): UserRecord[] {
  return read<UserRecord[]>(KEYS.users, []);
}

function saveUsers(list: UserRecord[]) {
  write(KEYS.users, list);
}

function findByEmail(email: string): UserRecord | null {
  const target = String(email || '').trim().toLowerCase();
  const list = users();
  for (const u of list) {
    if (u.email === target) return u;
  }
  return null;
}

function uid() {
  return 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function setSession(id: string | null) {
  if (id === null) {
    localStorage.removeItem(KEYS.session);
  } else {
    localStorage.setItem(KEYS.session, id);
  }
}

export function sessionUserId(): string | null {
  try {
    return localStorage.getItem(KEYS.session);
  } catch {
    return null;
  }
}

export function currentUser(): UserRecord | null {
  const id = sessionUserId();
  if (!id) return null;
  return users().find((u) => u.id === id) || null;
}

export function passwordScore(pw: string): number {
  let score = 0;
  if (!pw) return 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw) && /\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

export function signup(data: {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
}): Result {
  if (!data.fname.trim() || !data.lname.trim()) {
    return { ok: false, error: 'Please enter your first and last name.' };
  }
  if (!validEmail(data.email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (findByEmail(data.email)) {
    return {
      ok: false,
      error: 'An account with this email already exists. Try logging in instead.',
    };
  }
  if (!data.phone.trim()) {
    return { ok: false, error: 'Please enter your phone number.' };
  }
  if ((data.password || '').length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters long.' };
  }
  if (data.password !== data.confirm) {
    return { ok: false, error: 'Passwords do not match.' };
  }

  const user: UserRecord = {
    id: uid(),
    fname: data.fname.trim(),
    lname: data.lname.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    password: data.password,
    createdAt: Date.now(),
  };

  const list = users();
  list.push(user);
  saveUsers(list);
  setSession(user.id);

  return { ok: true, user };
}

export function login(email: string, password: string): Result {
  if (!validEmail(email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  const user = findByEmail(email);
  if (!user) {
    return { ok: false, error: 'No account found with this email. Please sign up first.' };
  }
  if (user.password !== password) {
    return {
      ok: false,
      error: 'Incorrect password. Please try again or reset it below.',
    };
  }
  setSession(user.id);
  return { ok: true, user };
}

export function requestReset(email: string): Result {
  if (!validEmail(email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  const user = findByEmail(email);
  if (!user) {
    return { ok: false, error: 'No account found with this email address.' };
  }
  let code = '';
  for (let i = 0; i < 6; i++) code += Math.floor(Math.random() * 10);
  const resets = read<Record<string, { code: string; exp: number }>>(KEYS.resets, {});
  resets[user.email] = { code, exp: Date.now() + 15 * 60 * 1000 };
  write(KEYS.resets, resets);
  return { ok: true, code, email: user.email, fname: user.fname };
}

export function verifyResetCode(email: string, code: string): Result {
  const resets = read<Record<string, { code: string; exp: number }>>(KEYS.resets, {});
  const key = String(email).trim().toLowerCase();
  const entry = resets[key];
  if (!entry) return { ok: false, error: 'No reset request found. Please start again.' };
  if (Date.now() > entry.exp) {
    return { ok: false, error: 'This code has expired. Please request a new one.' };
  }
  if (entry.code !== String(code).trim()) {
    return { ok: false, error: 'Incorrect code. Please check and try again.' };
  }
  return { ok: true };
}

export function resetPassword(email: string, pw: string, confirm: string): Result {
  if ((pw || '').length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters long.' };
  }
  if (pw !== confirm) {
    return { ok: false, error: 'Passwords do not match.' };
  }
  const list = users();
  const target = String(email).trim().toLowerCase();
  for (const u of list) {
    if (u.email === target) {
      u.password = pw;
      saveUsers(list);
      const resets = read<Record<string, { code: string; exp: number }>>(KEYS.resets, {});
      delete resets[target];
      write(KEYS.resets, resets);
      return { ok: true };
    }
  }
  return { ok: false, error: 'Account not found.' };
}

export function maskEmail(email: string) {
  const parts = String(email).split('@');
  const visible = (parts[0] || '').slice(0, 2);
  return visible + '\u2022\u2022\u2022\u2022@' + (parts[1] || '');
}

export function changePassword(
  userId: string,
  currentPw: string,
  newPw: string,
  confirmPw: string
): Result {
  if (!currentPw) {
    return { ok: false, error: 'Please enter your current password.' };
  }
  if ((newPw || '').length < 8) {
    return { ok: false, error: 'New password must be at least 8 characters long.' };
  }
  if (newPw !== confirmPw) {
    return { ok: false, error: 'New passwords do not match.' };
  }
  const list = users();
  const user = list.find((u) => u.id === userId);
  if (!user) {
    return { ok: false, error: 'Account not found.' };
  }
  if (user.password !== currentPw) {
    return { ok: false, error: 'Current password is incorrect.' };
  }
  user.password = newPw;
  saveUsers(list);
  return { ok: true };
}

const AVATAR_KEY = 'eth_avatars';

export function updateAvatar(userId: string, dataUrl: string) {
  try {
    const raw = localStorage.getItem(AVATAR_KEY);
    const map: Record<string, string> = raw ? JSON.parse(raw) : {};
    map[userId] = dataUrl;
    localStorage.setItem(AVATAR_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function getAvatar(userId: string): string | null {
  try {
    const raw = localStorage.getItem(AVATAR_KEY);
    const map: Record<string, string> = raw ? JSON.parse(raw) : {};
    return map[userId] || null;
  } catch {
    return null;
  }
}

export function removeAvatar(userId: string) {
  try {
    const raw = localStorage.getItem(AVATAR_KEY);
    const map: Record<string, string> = raw ? JSON.parse(raw) : {};
    delete map[userId];
    localStorage.setItem(AVATAR_KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}