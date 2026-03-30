import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050508]/85 backdrop-blur-[20px] saturate-[1.6] border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-light shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-black tracking-tight text-white leading-none">Brasil</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-brand-light leading-none mt-1">DIGITAL</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#planos" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Planos</a>
          <a href="#promocoes" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Promoções</a>
          <a href="#diferenciais" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Diferenciais</a>
          <a href="#contato" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">Contato</a>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            to="/contratar"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-cta to-brand-cta-hover px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(16,185,129,0.4)] transition-all duration-300"
          >
            Contratar
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#050508]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl">
          <div className="flex flex-col px-5 py-6 gap-4">
            <a href="#planos" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-text-primary">Planos</a>
            <a href="#promocoes" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-text-primary">Promoções</a>
            <a href="#diferenciais" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-text-primary">Diferenciais</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-text-primary">Contato</a>
            <Link
              to="/contratar"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-brand-cta to-brand-cta-hover px-8 py-4 text-base font-bold text-white shadow-[0_8px_32px_rgba(16,185,129,0.25)]"
            >
              Contratar Agora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
