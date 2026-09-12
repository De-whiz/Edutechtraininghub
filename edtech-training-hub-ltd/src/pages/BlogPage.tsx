import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { PageId, BlogPost } from '../types';
import { readAllPosts } from '../utils/blogs';
import { Reveal } from '../components/Reveal';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Search,
  Tag,
  BookOpen,
  UserRound,
  X,
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
}

const postBody = (post: BlogPost) => post.content.split('\n\n');

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => readAllPosts());
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'eth_blog_posts' || e.key === null) {
        setAllPosts(readAllPosts());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(allPosts.map((p) => p.category)))],
    [allPosts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPosts.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory, allPosts]);

  const featured = allPosts[0];

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-slate-50">
        <section className="relative bg-gradient-to-br from-[#102A45] via-[#1E4E79] to-[#0F6B78] text-white">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%)]" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#F15A29] text-white text-[11px] font-bold">
                {selectedPost.category}
              </span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
              {selectedPost.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-200">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="w-4 h-4 text-slate-300" />
                {selectedPost.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-slate-300" />
                {new Date(selectedPost.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-300" />
                {selectedPost.readTime}
              </span>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="space-y-5">
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
              {selectedPost.excerpt}
            </p>
            <div className="h-px bg-slate-200" />
            {postBody(selectedPost).map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-[15px] sm:text-base text-slate-600 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </article>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              <Tag className="w-4 h-4" />
              Tags
            </span>
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200">
            <div>
              <p className="text-sm font-bold text-[#1E4E79]">Ready to put this into practice?</p>
              <p className="text-sm text-slate-500 mt-0.5">
                Explore our practical programmes and short courses.
              </p>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F15A29] hover:bg-[#d94f23] text-white text-xs font-bold transition-colors"
            >
              View Courses
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#102A45] via-[#1E4E79] to-[#0F6B78] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%)]" />
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#F15A29]/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal direction="up">
            <p className="inline-flex items-center gap-2 text-xs font-bold text-[#ffb59b] uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              EdTech Insights &amp; Resources
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              The Blog
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="mt-5 max-w-2xl text-slate-200 text-base sm:text-lg leading-relaxed">
              Practical insights, tips and guides on online teaching, digital skills,
              AI in education, course creation and instructional design — written for
              educators and learning professionals across Nigeria.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <Reveal direction="up">
          <button
            onClick={() => setSelectedPost(featured)}
            className="w-full text-left group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all p-6 sm:p-8 flex flex-col lg:flex-row gap-6"
          >
            <div className="lg:w-2/5 flex lg:items-center">
              <div className="w-full rounded-2xl bg-gradient-to-br from-[#1E4E79] to-[#0F6B78] p-8 sm:p-10 flex items-center justify-center text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,white,transparent_50%)]" />
                <BookOpen className="relative w-16 h-16 text-[#ffb59b] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="lg:w-3/5 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#F15A29] text-white text-[11px] font-bold">
                  {featured.category}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-600">
                  Featured
                </span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-[#1E4E79] transition-colors">
                {featured.title}
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{featured.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <UserRound className="w-4 h-4 text-[#0F6B78]" />
                  {featured.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-[#0F6B78]" />
                  {new Date(featured.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0F6B78]" />
                  {featured.readTime}
                </span>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#F15A29]">
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </button>
        </Reveal>
      </section>

      {/* Filters + search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Reveal direction="up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#1E4E79] text-white shadow-md shadow-[#1E4E79]/20'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1E4E79]/40 hover:text-[#1E4E79]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, tags..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E4E79]/30 focus:border-[#1E4E79]/40 transition-shadow"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Post grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filtered.length === 0 ? (
          <Reveal direction="up">
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
              <p className="mt-4 text-lg font-bold text-slate-800">No articles found</p>
              <p className="mt-1 text-sm text-slate-500">
                Try a different keyword or category.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCategory('All');
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#1E4E79] hover:bg-[#163959] text-white text-xs font-bold transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <Reveal key={post.id} direction="up" delay={(i % 3) * 0.08}>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full text-left group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden"
                >
                  <div className="h-40 bg-gradient-to-br from-[#102A45] via-[#1E4E79] to-[#0F6B78] flex items-center justify-center text-white overflow-hidden relative">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,white,transparent_50%)]" />
                    <BookOpen className="w-10 h-10 text-[#ffb59b] group-hover:scale-110 transition-transform duration-300" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#F15A29] text-white text-[10px] font-bold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-slate-900 leading-snug group-hover:text-[#1E4E79] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 inline-flex items-center gap-1.5">
                        <UserRound className="w-3.5 h-3.5 text-[#0F6B78]" />
                        {post.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#F15A29]">
                        Read
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* CTA banner */}
      <section className="bg-[#1E4E79] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Reveal direction="up">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Want to learn these skills hands-on?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-200">
              Join thousands of educators and professionals who are building practical
              digital, teaching and AI skills with our short, practical programmes.
            </p>
            <button
              onClick={() => onNavigate('courses')}
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#F15A29] hover:bg-[#d94f23] text-white text-sm font-bold shadow-lg shadow-black/20 transition-colors"
            >
              Explore Our Courses
              <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;