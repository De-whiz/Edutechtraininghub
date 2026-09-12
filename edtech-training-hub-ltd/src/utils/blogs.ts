import { BlogPost } from '../types';
import { blogPosts } from '../data/blogData';

const STORAGE_KEY = 'eth_blog_posts';

interface RawAdminPost {
  id?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  date?: string;
  readTime?: string;
  tags?: string[] | unknown;
}

function toBlogPost(raw: RawAdminPost, index: number): BlogPost {
  const content = String(raw.content ?? '');
  const words = content.split(/\s+/).filter(Boolean).length;
  const date = String(raw.date ?? '');
  return {
    id: String(raw.id ?? `blog_${index}_${Date.now()}`),
    title: String(raw.title ?? 'Untitled'),
    excerpt: String(raw.excerpt ?? ''),
    content,
    category: String(raw.category ?? 'News'),
    author: String(raw.author ?? 'EdTech Training Hub Team'),
    date,
    readTime: String(raw.readTime ?? `${Math.max(1, Math.round(words / 200))} min read`),
    tags: Array.isArray(raw.tags) ? raw.tags.filter((t): t is string => typeof t === 'string') : [],
  };
}

export function readAdminPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return list.map((p, i) => toBlogPost(p ?? {}, i));
  } catch {
    return [];
  }
}

export function readAllPosts(): BlogPost[] {
  return [...readAdminPosts(), ...blogPosts];
}