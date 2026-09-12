import { ReviewItem } from '../types';
import { seedReviews } from '../data/reviewsData';

const REVIEWS_KEY = 'eth_course_reviews';

function readUserReviews(): ReviewItem[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(list) ? (list as ReviewItem[]) : [];
  } catch {
    return [];
  }
}

function readReviews(): ReviewItem[] {
  return [...seedReviews, ...readUserReviews()];
}

function writeReviews(list: ReviewItem[]) {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function addReview(review: Omit<ReviewItem, 'id' | 'date'>): boolean {
  const exists = readReviews().find(
    (r) => r.userId === review.userId && r.courseId === review.courseId
  );
  if (exists) return false;
  const newReview: ReviewItem = {
    ...review,
    id: `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    date: Date.now(),
  };
  writeReviews([newReview, ...readUserReviews()]);
  return true;
}

export function getCourseReviews(courseId: string): ReviewItem[] {
  return readReviews()
    .filter((r) => r.courseId === courseId)
    .sort((a, b) => b.date - a.date);
}

export function averageRating(courseId: string): number {
  const reviews = readReviews().filter((r) => r.courseId === courseId);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export function totalReviews(courseId: string): number {
  return readReviews().filter((r) => r.courseId === courseId).length;
}

export function userHasReviewed(userId: string, courseId: string): boolean {
  return readReviews().some(
    (r) => r.userId === userId && r.courseId === courseId
  );
}

export function ratingDistribution(courseId: string): number[] {
  const reviews = readReviews().filter((r) => r.courseId === courseId);
  const dist = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) dist[r.rating - 1]++;
  });
  return dist;
}
