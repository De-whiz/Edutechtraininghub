import { CourseItem } from '../types';
import { allCatalog } from './catalog';

const CART_KEY = 'eth_cart';

export const CART_EVENT = 'eth-cart-updated';

const CATALOG_ID_FALLBACK: Record<string, number> = {
  masterclass: 101,
  'id-fundamentals': 102,
  'ai-educators': 103,
  'lms-course-creators': 104,
  'digital-skills-teachers': 105,
  'elearning-content-dev': 106,
  'online-tutoring-support': 107,
  'digital-product-creation': 108,
  'advanced-instructional-design': 109,
  'ai-powered-content-creation': 110,
  'digital-productivity-professionals': 111,
  'video-course-production': 112,
  'lms-administration-mgmt': 113,
};

interface CatalogEntry {
  id: number;
  title: string;
}

function readCatalog(): CatalogEntry[] {
  try {
    const raw = localStorage.getItem('eth_catalog');
    const list = raw ? (JSON.parse(raw) as CatalogEntry[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function catalogIdForCourse(course: CourseItem): number {
  const title = String(course.title || '').trim().toLowerCase();
  const fromCatalog = readCatalog().find(
    (c) => String(c.title || '').trim().toLowerCase() === title
  );
  if (fromCatalog && typeof fromCatalog.id === 'number') return fromCatalog.id;
  return CATALOG_ID_FALLBACK[course.id] ?? 0;
}

export function courseFromCatalogId(id: number): CourseItem | null {
  const num = Number(id);
  if (isNaN(num)) return null;
  return allCatalog().find((c) => catalogIdForCourse(c) === num) || null;
}

export function getCart(): number[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(list)) return [];
    return list.map(Number).filter((n) => !isNaN(n));
  } catch {
    return [];
  }
}

function saveCart(ids: number[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(ids));
  } catch {
    /* ignore storage errors */
  }
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(id: number): boolean {
  const ids = getCart();
  if (ids.includes(id)) return false;
  ids.push(id);
  saveCart(ids);
  return true;
}

export function removeFromCart(id: number) {
  const ids = getCart().filter((x) => x !== Number(id));
  saveCart(ids);
}

export function clearCart() {
  saveCart([]);
}

export function inCart(id: number): boolean {
  return getCart().includes(Number(id));
}

export function cartCourses(): CourseItem[] {
  return getCart()
    .map((id) => courseFromCatalogId(id))
    .filter((c): c is CourseItem => c !== null);
}

export function parsePrice(price?: string): number {
  if (!price) return 0;
  const digits = price.replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export function formatPrice(n: number): string {
  return '\u20A6' + n.toLocaleString('en-NG');
}

export function cartTotal(): number {
  return cartCourses().reduce((sum, c) => sum + parsePrice(c.price), 0);
}