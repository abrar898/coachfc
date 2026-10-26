'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crest } from './Crest';
import { Menu, X, Shield, ArrowRight, Activity, Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Match Center', href: '/' },
    { name: 'Player Ratings', href: '/#ratings' },
    { name: 'Goals & Timeline', href: '/#timeline' },
    { name: 'Derby History', href: '/#derby-history' },
    { name: 'Possession & Stats', href: '/#stats' },
    { name: 'Squad', href: '/squad' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B12]/90 backdrop-blur-md border-b border-[#283141] shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-gradient-to-b from-[#080B12]/80 via-[#080B12]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Crest size={44} showWordmark={true} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? 'text-[#C6FF00]'
                      : 'text-[#929BA9] hover:text-[#F5F7FA]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C6FF00] shadow-[0_0_8px_#C6FF00]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Matchday Badge + Club Dashboard Link */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/matches"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111722] border border-[#283141] text-xs font-semibold text-[#929BA9] hover:border-[#C6FF00]/50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
              <span>NEXT: DERBY OCT 24</span>
            </Link>

            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C6FF00] text-[#080B12] text-xs font-black tracking-widest uppercase transition-all duration-200 hover:bg-[#B2E600] hover:shadow-[0_0_20px_rgba(198,255,0,0.4)] active:scale-95"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Club Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg bg-[#C6FF00] text-[#080B12] text-xs font-bold"
              aria-label="Dashboard"
            >
              <Shield className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#111722] border border-[#283141] text-[#F5F7FA] hover:text-[#C6FF00]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080B12]/98 border-b border-[#283141] px-4 pt-4 pb-6 space-y-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-bold uppercase tracking-wider ${
                    active
                      ? 'bg-[#171F2C] text-[#C6FF00] border-l-4 border-[#C6FF00]'
                      : 'text-[#929BA9] hover:bg-[#111722] hover:text-[#F5F7FA]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#283141] flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#C6FF00] text-[#080B12] font-black uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(198,255,0,0.3)]"
            >
              <Shield className="w-4 h-4" />
              <span>Access Club Dashboard</span>
            </Link>
            <Link
              href="/matches"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#111722] border border-[#283141] text-xs font-semibold text-[#929BA9]"
            >
              <Calendar className="w-4 h-4 text-[#C6FF00]" />
              <span>Upcoming Derby — Oct 24</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
