import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { db } from '@/lib/db';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, ArrowRight } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return db.getNews().map((n) => ({ slug: n.slug }));
}

export default async function NewsDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = db.getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const allNews = db.getNews();
  const related = allNews.filter(n => n.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F7FA]">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#929BA9] hover:text-[#C6FF00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All News</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-xs text-[#929BA9] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C6FF00]" />
                {article.publishedAt.split('T')[0]}
              </span>
              <span className="text-xs text-[#929BA9] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C6FF00]" />
                {article.readTimeMinutes} min read
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F5F7FA] leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-[#929BA9] font-medium leading-relaxed border-l-2 border-[#C6FF00] pl-4 italic">
              {article.excerpt}
            </p>

            {/* Author Credit */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#283141]">
              <div className="w-10 h-10 rounded-full bg-[#171F2C] border border-[#283141] flex items-center justify-center text-[#C6FF00] font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-[#F5F7FA]">{article.author}</div>
                <div className="text-[10px] text-[#929BA9] uppercase font-mono">{article.authorRole}</div>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="my-8 rounded-2xl overflow-hidden border border-[#283141] shadow-2xl h-80 sm:h-[450px]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body Content */}
          <div className="prose prose-invert max-w-none text-base leading-relaxed text-[#F5F7FA]/90 space-y-6">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-[#283141] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#929BA9] uppercase flex items-center gap-1.5 mr-2">
              <Tag className="w-3.5 h-3.5 text-[#C6FF00]" /> Tags:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-[#111722] border border-[#283141] text-xs font-mono text-[#F5F7FA]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#283141]">
              <h3 className="text-xl font-black uppercase text-[#F5F7FA] mb-6">
                Related Club Stories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/news/${rel.slug}`}
                    className="p-5 rounded-xl bg-[#111722] border border-[#283141] hover:border-[#C6FF00]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#C6FF00] block mb-2">
                        {rel.category}
                      </span>
                      <h4 className="text-base font-black uppercase text-[#F5F7FA] line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="mt-4 text-xs font-bold text-[#929BA9] flex items-center gap-1 hover:text-[#C6FF00]">
                      Read Story <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
