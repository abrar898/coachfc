'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { db } from '@/lib/db';
import { NewsArticle } from '@/lib/types';
import { Calendar, Clock, ArrowRight, Search, Shield, Filter } from 'lucide-react';

export default function NewsPage() {
  const allArticles = useMemo(() => db.getNews(), []);
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      const matchCat = selectedCat === 'ALL' || art.category === selectedCat;
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allArticles, selectedCat, searchQuery]);

  const featured = allArticles.find(a => a.isFeatured) || allArticles[0];
  const regular = filteredArticles.filter(a => a.id !== featured?.id || searchQuery !== '' || selectedCat !== 'ALL');

  const categories = ['ALL', 'Match Report', 'First Team', 'Club News', 'Tactics', 'Academy'];

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F7FA]">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#283141] gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
                Official Press & Editorial Desks
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5F7FA]">
                CLUB <span className="text-[#C6FF00]">NEWS</span>
              </h1>
              <p className="mt-2 text-sm text-[#929BA9] max-w-xl">
                Match reactions, tactical analysis, player interviews, transfer announcements, and academy dispatches.
              </p>
            </div>

            <Link
              href="/dashboard/news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171F2C] border border-[#283141] text-xs font-black uppercase tracking-widest text-[#C6FF00] hover:border-[#C6FF00] transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Admin: CMS Publisher</span>
            </Link>
          </div>

          {/* Featured Article Banner */}
          {featured && selectedCat === 'ALL' && searchQuery === '' && (
            <div className="mt-8">
              <Link
                href={`/news/${featured.slug}`}
                className="group relative rounded-3xl overflow-hidden border border-[#283141] block bg-[#111722] hover:border-[#C6FF00]/50 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 h-72 sm:h-96 lg:h-full relative overflow-hidden min-h-[320px]">
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111722] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-md bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider">
                          {featured.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#C6FF00] bg-[#C6FF00]/10 px-2 py-0.5 rounded">
                          FEATURED STORY
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#F5F7FA] group-hover:text-[#C6FF00] transition-colors leading-snug">
                        {featured.title}
                      </h2>

                      <p className="mt-4 text-sm leading-relaxed text-[#929BA9]">
                        {featured.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#283141] flex items-center justify-between text-xs text-[#929BA9]">
                      <div className="flex items-center gap-4">
                        <span>{new Date(featured.publishedAt).toLocaleDateString()}</span>
                        <span>{featured.readTimeMinutes} min read</span>
                      </div>
                      <span className="font-bold text-[#F5F7FA] group-hover:text-[#C6FF00] flex items-center gap-1">
                        Read Story <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Filter Bar */}
          <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                    selectedCat === cat
                      ? 'bg-[#C6FF00] text-[#080B12]'
                      : 'bg-[#111722] text-[#929BA9] border border-[#283141] hover:text-[#F5F7FA]'
                  }`}
                >
                  {cat === 'ALL' ? 'All Stories' : cat}
                </button>
              ))}
            </div>

            <div className="relative sm:w-72">
              <Search className="w-4 h-4 text-[#929BA9] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search headlines or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111722] border border-[#283141] pl-10 pr-4 py-2 rounded-xl text-xs text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
              />
            </div>
          </div>

          {/* Regular Articles Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regular.map((art) => (
              <Link
                key={art.id}
                href={`/news/${art.slug}`}
                className="group bg-[#111722] border border-[#283141] rounded-2xl overflow-hidden hover:border-[#C6FF00]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden bg-[#171F2C]">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#080B12]/80 backdrop-blur-md text-[#C6FF00] text-[11px] font-black uppercase tracking-wider border border-[#283141]">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-[#929BA9] mb-3">
                      <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                      <span>{art.readTimeMinutes} min read</span>
                    </div>

                    <h3 className="text-xl font-black uppercase text-[#F5F7FA] group-hover:text-[#C6FF00] transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="mt-3 text-sm text-[#929BA9] line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#283141] flex items-center justify-between text-xs font-bold text-[#F5F7FA] group-hover:text-[#C6FF00] transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
