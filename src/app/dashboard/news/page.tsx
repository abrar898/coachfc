'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db';
import { NewsArticle } from '@/lib/types';
import { 
  Newspaper, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  Star, 
  Calendar, 
  ExternalLink 
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardNewsCMSPage() {
  const [articles, setArticles] = useState<NewsArticle[]>(() => db.getNews());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'First Team' as NewsArticle['category'],
    author: 'Alexandre Moreau',
    authorRole: 'Head Coach',
    readTimeMinutes: 4,
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    tags: 'Coach FC, Tactics, Premier League'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    db.createNews({
      title: form.title,
      excerpt: form.excerpt || form.title,
      content: form.content,
      category: form.category,
      author: form.author,
      authorRole: form.authorRole,
      readTimeMinutes: Number(form.readTimeMinutes),
      coverImage: form.coverImage,
      isFeatured: form.isFeatured,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setArticles(db.getNews());
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#283141] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
            Editorial Publishing Suite
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
            CLUB NEWS & PRESS CMS
          </h1>
          <p className="text-xs text-[#929BA9] mt-0.5">
            Draft, publish, and feature match reports, tactical breakdowns, interviews, and official statements.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Article</span>
        </button>
      </div>

      {/* Articles Table */}
      <div className="bg-[#111722] border border-[#283141] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#171F2C] border-b border-[#283141] text-[#929BA9] font-mono uppercase">
              <tr>
                <th className="p-4">Article</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Published</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#283141]">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-[#171F2C]/50 transition-colors">
                  <td className="p-4 font-bold text-[#F5F7FA] max-w-xs">
                    <div className="truncate text-sm">{art.title}</div>
                    <div className="text-[10px] text-[#929BA9] truncate">{art.excerpt}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-[#171F2C] border border-[#283141] text-xs text-[#C6FF00] font-mono">
                      {art.category}
                    </span>
                  </td>
                  <td className="p-4 text-[#929BA9]">
                    <div className="font-bold text-[#F5F7FA]">{art.author}</div>
                    <div className="text-[10px]">{art.authorRole}</div>
                  </td>
                  <td className="p-4 font-mono text-[#929BA9]">
                    {new Date(art.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    {art.isFeatured ? (
                      <span className="px-2 py-0.5 rounded bg-[#C6FF00]/10 text-[#C6FF00] font-mono font-bold text-[10px] border border-[#C6FF00]/30 inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> HOMEPAGE
                      </span>
                    ) : (
                      <span className="text-[#929BA9] text-[10px]">-</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/news/${art.slug}`}
                      className="text-[#929BA9] hover:text-[#C6FF00] inline-flex items-center gap-1 font-bold"
                    >
                      <span>Read Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#283141]">
              <h3 className="text-xl font-black uppercase text-[#F5F7FA]">Publish Club Article</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-[#929BA9] hover:text-[#F5F7FA]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Headline</label>
                <input
                  type="text"
                  required
                  placeholder="Enter compelling matchday or club headline..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  >
                    <option value="Match Report">Match Report</option>
                    <option value="First Team">First Team</option>
                    <option value="Club News">Club News</option>
                    <option value="Tactics">Tactics</option>
                    <option value="Academy">Academy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#929BA9] font-bold uppercase mb-1">Estimated Read Time (Mins)</label>
                  <input
                    type="number"
                    min="1"
                    value={form.readTimeMinutes}
                    onChange={(e) => setForm({ ...form, readTimeMinutes: Number(e.target.value) })}
                    className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Lead Excerpt</label>
                <input
                  type="text"
                  placeholder="Short introductory summary for card previews..."
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Article Body Content</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write full article here..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] p-3 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="rounded bg-[#171F2C] border-[#283141] text-[#C6FF00] focus:ring-0"
                />
                <label htmlFor="featuredCheck" className="text-xs text-[#F5F7FA] font-bold">
                  Pin as Top Featured Story on Homepage
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#283141]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#171F2C] text-[#F5F7FA] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] font-black uppercase tracking-wider hover:bg-[#B2E600]"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
