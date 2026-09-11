import { CourseItem, PageId } from '../types';
import { courseFromCatalogId } from './cart';

export const PENDING_CHECKOUT_KEY = 'eth_pending_checkout';

function readObj<T>(key: string): Record<string, T> {
  try {
    const raw = localStorage.getItem(key);
    const data = raw ? (JSON.parse(raw) as unknown) : {};
    return data && typeof data === 'object' && !Array.isArray(data)
      ? (data as Record<string, T>)
      : {};
  } catch {
    return {};
  }
}

export function enrolledCourses(userId: string): CourseItem[] {
  if (!userId) return [];
  const enrollMap = readObj<number[]>('eth_enroll');
  const ids = (enrollMap[userId] || [])
    .map(Number)
    .filter((n) => !isNaN(n));
  return ids
    .map((id) => courseFromCatalogId(id))
    .filter((c): c is CourseItem => c !== null);
}

export function userActivity(
  userId: string
): Array<{ ts: number; text: string }> {
  if (!userId) return [];
  const activityMap = readObj<Array<{ ts: number; text: string }>>(
    'eth_activity'
  );
  const list = activityMap[userId] || [];
  return Array.isArray(list)
    ? [...list].sort((a, b) => (b.ts || 0) - (a.ts || 0))
    : [];
}

export function formatWhen(ts: number): string {
  if (!ts) return '';
  try {
    return new Date(ts).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export function setPendingCheckout(courses: CourseItem[], returnHash: string) {
  try {
    sessionStorage.setItem(
      PENDING_CHECKOUT_KEY,
      JSON.stringify({ courses, returnHash: returnHash || '#home' })
    );
  } catch {
    /* ignore storage errors */
  }
}

export function clearPendingCheckout() {
  try {
    sessionStorage.removeItem(PENDING_CHECKOUT_KEY);
  } catch {
    /* ignore storage errors */
  }
}

export interface PendingCheckout {
  courses: CourseItem[];
  returnPage: PageId;
  returnTarget?: string;
}

const VALID_PAGES: PageId[] = [
  'home',
  'about',
  'solutions',
  'courses',
  'who-we-serve',
  'contact',
  'login',
  'signup',
  'forgot-password',
  'dashboard',
];

export function getPendingCheckout(): PendingCheckout | null {
  try {
    const raw = sessionStorage.getItem(PENDING_CHECKOUT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { courses?: CourseItem[]; returnHash?: string };
    if (!Array.isArray(data.courses) || data.courses.length === 0) return null;
    const h = String(data.returnHash || '').replace('#', '');
    const [p, t] = h.split('/');
    const page = VALID_PAGES.includes(p as PageId) ? (p as PageId) : 'home';
    return { courses: data.courses, returnPage: page, returnTarget: t || undefined };
  } catch {
    return null;
  }
}