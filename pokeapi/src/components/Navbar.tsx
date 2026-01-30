"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { t, setLang, lang } = useLanguage();

  return (
    <header className="glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-180 transition-transform duration-500">
            <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-800">POKEAPP</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">{t.home}</Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors py-8">
              {t.generations}
            </button>
            <div className="absolute hidden group-hover:block top-full left-0 w-56 bg-white shadow-2xl rounded-2xl border border-slate-100 p-2 overflow-hidden transform origin-top animate-in fade-in zoom-in duration-200">
              {[1, 2, 3].map((num) => (
                <Link key={num} href={`/generation/${num}`} className="block px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-700 normal-case font-semibold">
                  {t[`gen${num}`]}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/contacto" className="hover:text-blue-600 transition-colors">{t.contact}</Link>
        </nav>

        <div className="flex gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-200">
          {['es', 'en', 'fr'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${lang === l ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}