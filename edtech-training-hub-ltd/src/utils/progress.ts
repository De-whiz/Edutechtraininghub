import { catalogIdForCourse } from './cart';
import { allCatalog } from './catalog';

interface CourseProgress {
  started: boolean;
  completedItems: number[];
  lastAccessed: number;
}

type ProgressMap = Record<string, CourseProgress>;

const ADMIN_PROGRESS_KEY = 'eth_progress';

interface AdminProgressEntry {
  done: number[];
  quizzes: Record<string, unknown>;
  completedAt?: number;
}

function readAll(): Record<string, ProgressMap> {
  try {
    const raw = localStorage.getItem('eth_course_progress');
    const data = raw ? (JSON.parse(raw) as unknown) : {};
    return data && typeof data === 'object' && !Array.isArray(data)
      ? (data as Record<string, ProgressMap>)
      : {};
  } catch {
    return {};
  }
}

function mirrorAdminProgress(data: Record<string, ProgressMap>) {
  try {
    const catalog = allCatalog();
    const admin: Record<string, Record<string, AdminProgressEntry>> = {};
    Object.keys(data).forEach((userId) => {
      const userProgress = data[userId] || {};
      Object.keys(userProgress).forEach((courseId) => {
        const cp = userProgress[courseId];
        if (!cp || !cp.started) return;
        const course = catalog.find((c) => c.id === courseId);
        const catalogId = course ? catalogIdForCourse(course) : 0;
        if (!catalogId) return;
        const total = course ? course.whatYouLearn.length : 0;
        const entry: AdminProgressEntry = { done: cp.completedItems.slice(), quizzes: {} };
        if (total > 0 && cp.completedItems.length >= total) {
          entry.completedAt = cp.lastAccessed;
        }
        if (!admin[userId]) admin[userId] = {};
        admin[userId][String(catalogId)] = entry;
      });
    });
    localStorage.setItem(ADMIN_PROGRESS_KEY, JSON.stringify(admin));
  } catch {
    /* ignore */
  }
}

function writeAll(data: Record<string, ProgressMap>) {
  try {
    localStorage.setItem('eth_course_progress', JSON.stringify(data));
  } catch {
    /* ignore */
  }
  mirrorAdminProgress(data);
}

export function getCourseProgress(
  userId: string,
  courseId: string
): { started: boolean; completedItems: number[]; percentage: number; totalItems: number } {
  const all = readAll();
  const userProgress = all[userId] || {};
  const cp = userProgress[courseId];
  if (!cp) {
    return { started: false, completedItems: [], percentage: 0, totalItems: 0 };
  }
  return {
    started: cp.started,
    completedItems: cp.completedItems,
    percentage: 0,
    totalItems: 0,
  };
}

export function getCourseProgressWithTotal(
  userId: string,
  courseId: string,
  totalItems: number
): { started: boolean; completedItems: number[]; percentage: number } {
  const all = readAll();
  const userProgress = all[userId] || {};
  const cp = userProgress[courseId];
  if (!cp || totalItems === 0) {
    return { started: false, completedItems: [], percentage: 0 };
  }
  return {
    started: cp.started,
    completedItems: cp.completedItems,
    percentage: Math.round((cp.completedItems.length / totalItems) * 100),
  };
}

export function markStarted(userId: string, courseId: string) {
  const all = readAll();
  if (!all[userId]) all[userId] = {};
  if (!all[userId][courseId]) {
    all[userId][courseId] = {
      started: true,
      completedItems: [],
      lastAccessed: Date.now(),
    };
  } else {
    all[userId][courseId].started = true;
    all[userId][courseId].lastAccessed = Date.now();
  }
  writeAll(all);
}

export function toggleProgressItem(
  userId: string,
  courseId: string,
  itemIndex: number,
  totalItems: number
): number {
  const all = readAll();
  if (!all[userId]) all[userId] = {};
  if (!all[userId][courseId]) {
    all[userId][courseId] = {
      started: true,
      completedItems: [],
      lastAccessed: Date.now(),
    };
  }
  const cp = all[userId][courseId];
  cp.started = true;
  cp.lastAccessed = Date.now();
  const idx = cp.completedItems.indexOf(itemIndex);
  if (idx >= 0) {
    cp.completedItems.splice(idx, 1);
  } else {
    cp.completedItems.push(itemIndex);
  }
  writeAll(all);
  return totalItems > 0
    ? Math.round((cp.completedItems.length / totalItems) * 100)
    : 0;
}

export function getStartedCourses(userId: string): string[] {
  const all = readAll();
  const userProgress = all[userId] || {};
  return Object.entries(userProgress)
    .filter(([, cp]) => cp.started)
    .sort(([, a], [, b]) => b.lastAccessed - a.lastAccessed)
    .map(([courseId]) => courseId);
}

export function getLastAccessedCourse(userId: string): string | null {
  const started = getStartedCourses(userId);
  return started.length > 0 ? started[0] : null;
}
