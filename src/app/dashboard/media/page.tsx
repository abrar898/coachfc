'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db';
import { MediaAsset } from '@/lib/types';
import { 
  Film, 
  Image as ImageIcon, 
  Plus, 
  Play, 
  Check, 
  ExternalLink, 
  Video, 
  X,
  Upload
} from 'lucide-react';

export default function MediaManagerPage() {
  const [assets, setAssets] = useState<MediaAsset[]>(() => db.getMediaAssets());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);

  const [form, setForm] = useState({
    title: '',
    category: 'HERO_VIDEO' as MediaAsset['category'],
    url: '',
    altText: '',
    isHeroActive: false
  });

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;

    db.addMediaAsset({
      title: form.title,
      category: form.category,
      url: form.url,
      altText: form.altText || form.title,
      isHeroActive: form.isHeroActive
    });

    setAssets(db.getMediaAssets());
    setIsModalOpen(false);
    setForm({
      title: '',
      category: 'MATCH_PHOTO',
      url: '',
      altText: '',
      isHeroActive: false
    });
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#283141] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#C6FF00] uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C6FF00]" />
            Digital Asset Management
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#F5F7FA]">
            MEDIA & VIDEO MANAGER
          </h1>
          <p className="text-xs text-[#929BA9] mt-0.5">
            Configure homepage hero video URLs, poster fallbacks, player photography, and match photo galleries.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6FF00] text-[#080B12] text-xs font-black uppercase tracking-wider hover:bg-[#B2E600] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Active Hero Video Callout */}
      <div className="bg-[#111722] border border-[#283141] p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#080B12] border border-[#C6FF00] flex items-center justify-center text-[#C6FF00] shrink-0">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#C6FF00]">
              Active Homepage Hero Stream
            </span>
            <h3 className="text-base font-black text-[#F5F7FA]">
              Coach FC Matchday Cinematic Intro
            </h3>
            <p className="text-xs text-[#929BA9]">
              Configured for full-viewport autoplay loop with low-bandwidth poster fallback.
            </p>
          </div>
        </div>

        <button
          onClick={() => setPreviewAsset(assets.find(a => a.category === 'HERO_VIDEO') || assets[0])}
          className="self-start sm:self-center px-4 py-2 rounded-xl bg-[#171F2C] border border-[#283141] text-xs font-bold text-[#F5F7FA] hover:text-[#C6FF00] hover:border-[#C6FF00] transition-colors flex items-center gap-2"
        >
          <Play className="w-4 h-4 text-[#C6FF00]" />
          <span>Preview Hero Stream</span>
        </button>
      </div>

      {/* Media Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-[#111722] border border-[#283141] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#C6FF00]/40 transition-colors group"
          >
            {/* Media Thumbnail */}
            <div className="relative h-48 bg-[#080B12] overflow-hidden flex items-center justify-center">
              {asset.category === 'HERO_VIDEO' ? (
                <div className="relative w-full h-full">
                  <video
                    src={asset.url}
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#C6FF00] text-[#080B12] flex items-center justify-center">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={asset.url}
                  alt={asset.altText}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              )}

              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#080B12]/80 backdrop-blur-md text-[#C6FF00] text-[10px] font-mono font-bold uppercase border border-[#283141]">
                {asset.category.replace('_', ' ')}
              </span>

              {asset.isHeroActive && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#C6FF00] text-[#080B12] text-[10px] font-bold uppercase">
                  ACTIVE HERO
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#F5F7FA] truncate">{asset.title}</h4>
                <p className="text-xs text-[#929BA9] mt-1 line-clamp-2">{asset.altText}</p>
                <div className="mt-2 text-[10px] font-mono text-[#929BA9] truncate">
                  URL: {asset.url}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#283141] flex items-center justify-between text-xs text-[#929BA9]">
                <span>Added: {asset.createdAt}</span>
                <button
                  onClick={() => setPreviewAsset(asset)}
                  className="text-[#C6FF00] hover:underline font-bold"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#283141]">
              <h3 className="text-xl font-black uppercase text-[#F5F7FA]">Add Media Asset</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-[#929BA9] hover:text-[#F5F7FA]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Asset Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Training Camp Day 12"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                >
                  <option value="HERO_VIDEO">Hero Video Stream</option>
                  <option value="POSTER">Stadium Poster Background</option>
                  <option value="MATCH_PHOTO">Match Photography</option>
                  <option value="PORTRAIT">Player Portrait</option>
                  <option value="TRAINING">Training Action Shot</option>
                </select>
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Hosted Media URL (CDN / Cloudinary)</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div>
                <label className="block text-[#929BA9] font-bold uppercase mb-1">Accessibility Alternative Text</label>
                <input
                  type="text"
                  placeholder="Describe content for screen-readers..."
                  value={form.altText}
                  onChange={(e) => setForm({ ...form, altText: e.target.value })}
                  className="w-full bg-[#171F2C] border border-[#283141] px-3 py-2 rounded-xl text-[#F5F7FA] focus:outline-none focus:border-[#C6FF00]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="heroActive"
                  checked={form.isHeroActive}
                  onChange={(e) => setForm({ ...form, isHeroActive: e.target.checked })}
                  className="rounded bg-[#171F2C] border-[#283141] text-[#C6FF00] focus:ring-0"
                />
                <label htmlFor="heroActive" className="text-xs text-[#F5F7FA] font-bold">
                  Set as Primary Homepage Hero Media
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
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#111722] border border-[#283141] rounded-2xl p-6 max-w-2xl w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#283141]">
              <h3 className="text-base font-black uppercase text-[#F5F7FA]">{previewAsset.title}</h3>
              <button onClick={() => setPreviewAsset(null)} className="p-1 rounded-lg text-[#929BA9] hover:text-[#F5F7FA]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-black max-h-[400px] flex items-center justify-center">
              {previewAsset.category === 'HERO_VIDEO' ? (
                <video src={previewAsset.url} controls autoPlay className="w-full h-full max-h-[400px] object-contain" />
              ) : (
                <img src={previewAsset.url} alt="" className="w-full h-full max-h-[400px] object-contain" />
              )}
            </div>

            <div className="text-xs text-[#929BA9] font-mono break-all">
              Source URL: {previewAsset.url}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
