import { useEffect, useState } from 'react';
import { CourseItem, InstructorInfo } from '../types';
import { coursesCatalog, featuredMasterclass } from '../data/coursesData';

const CATALOG_KEY = 'eth_catalog';

type CourseCategory =
  | 'Digital Skills'
  | 'Instructional Design'
  | 'AI & Technology'
  | 'Online Teaching'
  | 'LMS'
  | 'Course Creation';

type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

const CATEGORY_SLUGS: Record<string, string> = {
  'digital-skills': 'Digital Skills',
  'ai': 'AI & Technology',
  'ai-and-technology': 'AI & Technology',
  'ai-technology': 'AI & Technology',
  'online-teaching': 'Online Teaching',
  'course-creation': 'Course Creation',
  'course-creators': 'Course Creation',
  'instructional-design': 'Instructional Design',
  'lms': 'LMS',
};

const LEVEL_SLUGS: Record<string, string> = {
  beginner: 'Beginner',
  all: 'All Levels',
  'all-levels': 'All Levels',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const VALID_CATEGORIES: CourseCategory[] = [
  'Digital Skills',
  'AI & Technology',
  'Online Teaching',
  'Course Creation',
  'Instructional Design',
  'LMS',
];

const VALID_LEVELS: CourseLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

const DEFAULT_INSTRUCTOR: InstructorInfo = featuredMasterclass.instructor as InstructorInfo;

const DEFAULT_DURATION = '4 Weeks';
const DEFAULT_FORMAT = 'Self-Paced Lessons + Live Support';
const DEFAULT_WHAT_YOU_LEARN = [
  'Hands-on modules broken into short, step-by-step lessons',
  'Practical projects and assignments with feedback',
  'Instructor support plus progress tracking and a certificate of completion',
];

interface RawCourse {
  id?: number | string;
  title?: string;
  tagline?: string;
  desc?: string;
  price?: string;
  priceNum?: number;
  duration?: string;
  level?: string;
  format?: string;
  cat?: string;
  featured?: boolean;
  published?: boolean;
  type?: string;
  modules?: Array<{ title?: string; lessons?: unknown[] }>;
}

function normalizeCategory(cat?: string): CourseCategory {
  const raw = String(cat ?? '').trim();
  const key = raw.toLowerCase();
  if (CATEGORY_SLUGS[key]) return CATEGORY_SLUGS[key] as CourseCategory;
  const match = VALID_CATEGORIES.find(
    (v) => v.toLowerCase() === key || raw.toLowerCase().includes(v.toLowerCase())
  );
  return (match ?? 'Digital Skills') as CourseCategory;
}

function normalizeLevel(level?: string): CourseLevel {
  const raw = String(level ?? '').trim().toLowerCase();
  if (LEVEL_SLUGS[raw]) return LEVEL_SLUGS[raw] as CourseLevel;
  const match = VALID_LEVELS.find((v) => v.toLowerCase() === raw);
  return (match ?? 'All Levels') as CourseLevel;
}

function nairaPrice(n?: number): string {
  if (!n || isNaN(n)) return '\u20A60';
  return '\u20A6' + n.toLocaleString('en-NG');
}

function toCourseItem(c: RawCourse): CourseItem | null {
  const title = String(c.title ?? '').trim();
  if (!title) return null;
  const modules = Array.isArray(c.modules) ? c.modules : [];
  const whatYouLearn = modules
    .map((m) => String(m?.title ?? '').trim())
    .filter(Boolean);
  const tagline = String(c.tagline ?? '').trim();
  return {
    id: String(c.id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
    title,
    category: normalizeCategory(c.cat),
    level: normalizeLevel(c.level),
    duration: String(c.duration ?? '').trim() || DEFAULT_DURATION,
    format: String(c.format ?? '').trim() || DEFAULT_FORMAT,
    price: String(c.price ?? '').trim() || nairaPrice(Number(c.priceNum)),
    description: String(c.desc ?? '').trim() || tagline || title,
    secondaryDescription: tagline || undefined,
    whatYouLearn: whatYouLearn.length ? whatYouLearn : DEFAULT_WHAT_YOU_LEARN,
    featured: !!c.featured,
    instructor: DEFAULT_INSTRUCTOR,
  };
}

export function readAdminCourses(): CourseItem[] {
  try {
    const raw = localStorage.getItem(CATALOG_KEY);
    const list = raw ? (JSON.parse(raw) as RawCourse[]) : [];
    if (!Array.isArray(list)) return [];
    return list
      .filter((c) => c && String(c.type) === 'course' && c.published !== false)
      .map((c) => toCourseItem(c))
      .filter((c): c is CourseItem => c !== null);
  } catch {
    return [];
  }
}

export function allCatalog(): CourseItem[] {
  const staticTitles = new Set(
    coursesCatalog.map((c) => c.title.trim().toLowerCase())
  );
  const adminOnes = readAdminCourses().filter(
    (c) => !staticTitles.has(c.title.trim().toLowerCase())
  );
  return [...adminOnes, ...coursesCatalog];
}

export function useCatalog(): CourseItem[] {
  const [courses, setCourses] = useState<CourseItem[]>(() => allCatalog());
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CATALOG_KEY || e.key === null) setCourses(allCatalog());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return courses;
}