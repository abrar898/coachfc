import React from 'react';
import Link from 'next/link';
import { NewsArticle } from '@/lib/types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface LatestNewsProps {
  news: NewsArticle[];
}

export const LatestNews: React.FC<LatestNewsProps> = ({ news }) => {
  const articles = news.slice(0, 3);

  return (
    <section className="py-24 bg-[#111722] relative border-t border-[#283141]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-[#C6FF00] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
              Editorial & Press
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#F5F7FA] tracking-tight">
              LATEST <span className="text-[#C6FF00]">CLUB NEWS</span>
            </h2>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F5F7FA] hover:text-[#C6FF00] transition-colors group"
          >
            <span>All Articles & Reports</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group bg-[#171F2C] rounded-2xl border border-[#283141] overflow-hidden hover:border-[#C6FF00]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Cover Image */}
              <div className="relative h-52 overflow-hidden bg-[#080B12]">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171F2C] via-transparent to-transparent opacity-70" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#080B12]/80 backdrop-blur-md border border-[#283141] text-[#C6FF00] text-[11px] font-black uppercase tracking-wider">
                  {article.category}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#929BA9] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C6FF00]" />
                      {article.publishedAt.split('T')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C6FF00]" />
                      {article.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase text-[#F5F7FA] group-hover:text-[#C6FF00] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#929BA9] line-clamp-2 leading-relaxed">
                    {article.excerpt}
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
    </section>
  );
};
