'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import heroIllustration from '../../images/hero-illustration.png';
import zhCommon from '../locales/zh.json';
import enCommon from '../locales/en.json';
import idCommon from '../locales/id.json';

type Language = 'zh' | 'en' | 'id';
type LocaleData = typeof zhCommon;

const locales: Record<Language, LocaleData> = {
  zh: zhCommon as LocaleData,
  en: enCommon as LocaleData,
  id: idCommon as LocaleData,
};

export default function Home() {
  const params = useParams();
  const lang = ((params.locale as string) || 'id') as Language;
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = locales[lang];

  useEffect(() => {
    if (t.tagline) {
      document.title = `QRHub - ${t.tagline}`;
    }
  }, [lang, t.tagline]);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // 滚动至联系我们
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/60 to-white font-sans overflow-x-hidden pt-14 text-gray-900">
      {/* NAVBAR - 保持不变 */}
      <nav className="bg-white/75 backdrop-blur-xl fixed inset-x-0 top-0 z-50 border-b border-white/40 shadow-[0_8px_30px_rgba(17,24,39,0.08)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14 min-h-14">
            <div className="flex items-center gap-x-3">
              <div className="w-9 h-9 bg-red-600 rounded-[8px] flex items-center justify-center">
                <div className="w-[40%] h-[40%] grid grid-cols-2 gap-[1px]">
                  <div className="bg-white"></div>
                  <div className="bg-white"></div>
                  <div className="bg-white"></div>
                  <div className="grid grid-cols-2 gap-[1px]">
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                  </div>
                </div>
              </div>
              <div className="text-lg md:text-xl font-bold tracking-[-0.5px]">QRHub</div>
            </div>

            <div className="hidden md:flex items-center gap-x-8 text-sm font-medium">
              <button onClick={() => scrollToSection('features')} className="hover:text-red-600 transition-colors">{t.nav.features}</button>
              <button onClick={() => scrollToSection('process')} className="hover:text-red-600 transition-colors">{t.nav.process}</button>
              <button onClick={() => scrollToSection('why')} className="hover:text-red-600 transition-colors">{t.nav.why}</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-red-600 transition-colors">{t.nav.faq}</button>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-x-1.5 px-2 py-1 text-sm font-semibold hover:text-red-600 transition-colors min-w-[92px] justify-between whitespace-nowrap"
                >
                  <span className="text-base leading-none">
                    {lang === 'zh' ? '🇨🇳' : lang === 'en' ? '🇬🇧' : '🇮🇩'}
                  </span>
                  <span>{lang.toUpperCase()}</span>
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-2xl shadow-xl py-2 z-50 text-sm overflow-hidden">
                    <Link href="/id" prefetch onClick={() => setShowLangMenu(false)} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left whitespace-nowrap">🇮🇩 {t.ui.languageOptions.id}</Link>
                    <Link href="/zh" prefetch onClick={() => setShowLangMenu(false)} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left whitespace-nowrap">🇨🇳 {t.ui.languageOptions.zh}</Link>
                    <Link href="/en" prefetch onClick={() => setShowLangMenu(false)} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left whitespace-nowrap">🇬🇧 {t.ui.languageOptions.en}</Link>
                  </div>
                )}
              </div>

              <div className="relative md:hidden">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-x-2 border rounded-3xl px-4 h-9 text-sm font-medium hover:bg-gray-50 transition-colors min-w-[104px] justify-between whitespace-nowrap"
                >
                  <span className="text-xl">
                    {lang === 'zh' ? '🇨🇳' : lang === 'en' ? '🇬🇧' : '🇮🇩'}
                  </span>
                  <span className="font-semibold">{lang.toUpperCase()}</span>
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-2xl shadow-xl py-2 z-50 text-sm overflow-hidden">
                    <Link href="/id" prefetch onClick={() => setShowLangMenu(false)} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left whitespace-nowrap">🇮🇩 {t.ui.languageOptions.id}</Link>
                    <Link href="/zh" prefetch onClick={() => setShowLangMenu(false)} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left whitespace-nowrap">🇨🇳 {t.ui.languageOptions.zh}</Link>
                    <Link href="/en" prefetch onClick={() => setShowLangMenu(false)} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left whitespace-nowrap">🇬🇧 {t.ui.languageOptions.en}</Link>
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-3xl"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-8 text-base font-medium animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-y-6">
              <button onClick={() => scrollToSection('features')} className="text-left py-2">{t.nav.features}</button>
              <button onClick={() => scrollToSection('process')} className="text-left py-2">{t.nav.process}</button>
              <button onClick={() => scrollToSection('why')} className="text-left py-2">{t.nav.why}</button>
              <button onClick={() => scrollToSection('faq')} className="text-left py-2">{t.nav.faq}</button>
              
              <button 
                onClick={() => { alert(t.alerts.apply); setMobileMenuOpen(false); }}
                className="bg-red-600 text-white w-full py-4 rounded-2xl font-bold text-center shadow-lg active:scale-95 transition-all"
              >
                {t.hero.btnApply}
              </button>

              <div className="pt-6 border-t text-sm">
                <div className="font-medium text-gray-500 mb-4 uppercase tracking-wider">{t.ui.language}</div>
                <div className="grid grid-cols-1 gap-4">
                  <Link href="/id" prefetch onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 whitespace-nowrap">🇮🇩 {t.ui.languageOptions.id}</Link>
                  <Link href="/zh" prefetch onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 whitespace-nowrap">🇨🇳 {t.ui.languageOptions.zh}</Link>
                  <Link href="/en" prefetch onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 whitespace-nowrap">🇬🇧 {t.ui.languageOptions.en}</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div key={lang} className="qrh-fade-in">
      {/* HERO */}
      <header className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid md:grid-cols-5 gap-10 items-center relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-red-600/15 blur-3xl"></div>
          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"></div>
        </div>
        <div className="space-y-8 w-full md:col-span-3">
          <h1 className="text-[2.8rem] sm:text-[3.2rem] md:text-[4.2rem] font-extrabold leading-[1.03] tracking-[-1.6px] text-balance mt-2 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 w-full md:w-[45vw] md:max-w-[45vw] leading-relaxed mt-4 md:mt-6">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-8 md:pt-14 md:max-w-[92%]">
            <button
              onClick={() => alert(t.alerts.apply)}
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-600 hover:to-red-600 text-white px-8 py-4 rounded-3xl font-semibold flex items-center justify-center gap-x-3 text-base md:text-[1rem] active:scale-95 transition-all shadow-[0_14px_34px_rgba(255,0,0,0.22)]"
            >
              {t.hero.btnApply} →
            </button>
            <button
              onClick={() => alert(t.alerts.guide)}
              className="w-full sm:w-auto bg-white/70 backdrop-blur border border-gray-900/20 hover:border-gray-900/40 hover:bg-white px-8 py-4 rounded-3xl font-semibold text-base md:text-[1rem] flex items-center justify-center active:scale-95 transition-all shadow-[0_10px_28px_rgba(17,24,39,0.06)]"
            >
              {t.hero.btnGuide}
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-start sm:gap-x-14 text-sm pt-0 sm:pl-5 md:pl-10 md:max-w-[92%]">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-600">{t.stats.boost}</div>
              <div className="text-[11px] text-gray-500">{t.stats.label1}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-600">{t.stats.coverage}</div>
              <div className="text-[11px] text-gray-500">{t.stats.label2}</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red-600">{t.stats.steps}</div>
              <div className="text-[11px] text-gray-500">{t.stats.label3}</div>
            </div>
          </div>
        </div>

        <figure className="flex justify-center md:justify-end m-0 w-full md:col-span-2">
          <Image
            src={heroIllustration}
            alt={t.hero.imageAlt}
            priority
            className="w-full max-w-[1244px] sm:max-w-[1693px] md:max-w-[2039px] h-auto object-contain drop-shadow-[0_24px_45px_rgba(220,38,38,0.16)]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 2039px"
          />
        </figure>
      </header>

      {/* FEATURES */}
      <section id="features" className="bg-gradient-to-b from-white via-red-50/50 to-white py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-red-100 text-red-700 text-sm font-semibold px-6 py-2 rounded-3xl mb-4 shadow-[0_10px_28px_rgba(255,0,0,0.08)]">
              {t.section2.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t.section2.title}</h2>
            <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">{t.section2.desc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/75 backdrop-blur rounded-[32px] p-8 border border-gray-100 shadow-[0_14px_40px_rgba(17,24,39,0.08)] hover:shadow-[0_24px_70px_rgba(17,24,39,0.12)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">💬</div>
              <h3 className="font-extrabold text-2xl">{t.section2.card1.title}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{t.section2.card1.desc}</p>
              <ul className="mt-8 space-y-4 text-sm">
                {t.section2.card1.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/75 backdrop-blur rounded-[32px] p-8 border border-gray-100 shadow-[0_14px_40px_rgba(17,24,39,0.08)] hover:shadow-[0_24px_70px_rgba(17,24,39,0.12)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">⚡</div>
              <h3 className="font-extrabold text-2xl">{t.section2.card2.title}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{t.section2.card2.desc}</p>
              <ul className="mt-8 space-y-4 text-sm">
                {t.section2.card2.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/75 backdrop-blur rounded-[32px] p-8 border border-gray-100 shadow-[0_14px_40px_rgba(17,24,39,0.08)] hover:shadow-[0_24px_70px_rgba(17,24,39,0.12)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">{'</>'}</div>
              <h3 className="font-extrabold text-2xl">{t.section2.card3.title}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{t.section2.card3.desc}</p>
              <ul className="mt-8 space-y-4 text-sm">
                {t.section2.card3.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="max-w-7xl mx-auto px-6 py-36 md:py-44 grid md:grid-cols-12 gap-12 items-center">
        {/* Left Card: Progress */}
        <div className="md:col-span-6 bg-white/75 backdrop-blur border border-gray-100 rounded-[32px] px-12 py-8 shadow-[0_18px_60px_rgba(17,24,39,0.10)] relative">
          <div className="flex justify-between items-start mb-1">
            <div className="text-sm font-medium text-gray-400">{t.section3.progress}</div>
            <div className="w-6 h-6 rounded-full border border-red-100 flex items-center justify-center">
              <span className="text-red-500 text-xs">✓</span>
            </div>
          </div>
          
          <div className="text-5xl font-bold text-gray-900 leading-none mb-4">75%</div>
          
          <div className="relative h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[75%] bg-red-600 rounded-full transition-all duration-1000"></div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs text-gray-400">{t.section3.realTime}</span>
          </div>

          <div className="space-y-3.5 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px]">✓</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{t.section3.step1.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px]">✓</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{t.section3.step2.title}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-400 text-xs font-bold">3</span>
              </div>
              <span className="text-sm font-medium text-gray-400">{t.section3.step3.title}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-400">{t.section3.estTime}</div>
            <div className="text-xl font-bold text-red-600">24h</div>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-6 pl-0 md:pl-12">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 backdrop-blur border border-red-100 text-red-700 text-xs font-bold rounded-full mb-6 shadow-[0_10px_28px_rgba(255,0,0,0.08)]">
              {t.section3.only3Steps}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-6">
              {t.section3.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
              {t.section3.subtitle}
            </p>
          </div>

          <div className="space-y-10 mt-12">
            <div className="flex gap-6 group">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-105">
                <span className="relative -top-0.5">👤<span className="absolute -right-1 -top-1 text-[10px] font-bold">+</span></span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-xs font-black text-red-600 tracking-tighter uppercase">{t.ui.step} 1</span>
                  <h3 className="font-bold text-xl text-gray-900">{t.section3.step1.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{t.section3.step1.desc}</p>
              </div>
            </div>
            
            <div className="flex gap-6 group">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-105">
                <span>📝</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-xs font-black text-red-600 tracking-tighter uppercase">{t.ui.step} 2</span>
                  <h3 className="font-bold text-xl text-gray-900">{t.section3.step2.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{t.section3.step2.desc}</p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-105">
                <span>⚙️</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-xs font-black text-red-600 tracking-tighter uppercase">{t.ui.step} 3</span>
                  <h3 className="font-bold text-xl text-gray-900">{t.section3.step3.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{t.section3.step3.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-36 md:py-44 bg-gradient-to-b from-white via-red-50/40 to-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <div className="md:col-span-6">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-red-100 text-red-700 px-5 py-2 rounded-full text-xs font-bold mb-6 shadow-[0_10px_28px_rgba(255,0,0,0.08)]">
              {t.why.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-6">
              {t.why.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-12 max-w-lg">
              {t.why.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/75 backdrop-blur border border-gray-100 rounded-[24px] p-6 flex items-center gap-4 shadow-[0_12px_30px_rgba(17,24,39,0.06)] hover:shadow-[0_20px_60px_rgba(17,24,39,0.10)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">
                  <span className="text-red-500 text-xl">👥</span>
                </div>
                <span className="font-semibold text-gray-800 text-sm leading-snug">{t.why.card1}</span>
              </div>
              <div className="bg-white/75 backdrop-blur border border-gray-100 rounded-[24px] p-6 flex items-center gap-4 shadow-[0_12px_30px_rgba(17,24,39,0.06)] hover:shadow-[0_20px_60px_rgba(17,24,39,0.10)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">
                  <span className="text-red-500 text-xl">✔️</span>
                </div>
                <span className="font-semibold text-gray-800 text-sm leading-snug">{t.why.card2}</span>
              </div>
              <div className="bg-white/75 backdrop-blur border border-gray-100 rounded-[24px] p-6 flex items-center gap-4 shadow-[0_12px_30px_rgba(17,24,39,0.06)] hover:shadow-[0_20px_60px_rgba(17,24,39,0.10)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">
                  <span className="text-red-500 text-xl">⚡</span>
                </div>
                <span className="font-semibold text-gray-800 text-sm leading-snug">{t.why.card3}</span>
              </div>
              <div className="bg-white/75 backdrop-blur border border-gray-100 rounded-[24px] p-6 flex items-center gap-4 shadow-[0_12px_30px_rgba(17,24,39,0.06)] hover:shadow-[0_20px_60px_rgba(17,24,39,0.10)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">
                  <span className="text-red-500 text-xl">{'</>'}</span>
                </div>
                <span className="font-semibold text-gray-800 text-sm leading-snug">{t.why.card4}</span>
              </div>
            </div>
          </div>

          {/* Right Dashboard Card */}
          <div className="md:col-span-6 flex justify-end">
            <div className="w-full max-w-[540px] bg-white/75 backdrop-blur border border-gray-100 rounded-[32px] p-8 shadow-[0_24px_80px_rgba(17,24,39,0.10)]">
              <div className="flex justify-between items-center mb-10">
                <span className="font-bold text-gray-900 text-lg">{t.why.dashboard.title}</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white/60 rounded-2xl p-6 border border-gray-100 shadow-[0_10px_26px_rgba(17,24,39,0.06)]">
                  <div className="text-[32px] font-bold text-emerald-500 mb-1">98%</div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>🛡️</span> {t.why.dashboard.stat1}
                  </div>
                </div>
                <div className="bg-white/60 rounded-2xl p-6 border border-gray-100 shadow-[0_10px_26px_rgba(17,24,39,0.06)]">
                  <div className="text-[32px] font-bold text-red-500 mb-1">24/7</div>
                  <div className="text-xs text-gray-400">{t.why.dashboard.stat2}</div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-sm font-medium text-gray-400">{t.why.dashboard.volume}</span>
                  <span className="text-xs font-bold text-emerald-500">+25%</span>
                </div>
                <div className="flex items-end gap-2.5 h-32 px-2">
                  {[40, 55, 45, 60, 48, 65, 52, 75].map((h, i) => (
                    <div key={i} className="flex-1 bg-red-500/90 rounded-t-[6px] hover:bg-red-600 transition-colors" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-36 md:py-44 bg-gradient-to-b from-white to-red-50/40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-red-100 text-red-700 px-5 py-2 rounded-3xl w-fit mb-6 shadow-[0_10px_28px_rgba(255,0,0,0.08)]">
              ❔ <span className="font-semibold">{t.faq.title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t.faq.title}</h2>
            <p className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed">{t.faq.subtitle}</p>

            <button
              onClick={scrollToContact}
              className="mt-10 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 h-12 rounded-3xl flex items-center gap-3 hover:from-red-600 hover:to-red-600 transition-all shadow-[0_14px_34px_rgba(255,0,0,0.22)] active:scale-95"
            >
              📞 {t.faq.contact}
            </button>
          </div>

          <div className="md:col-span-7 space-y-3">
            {(t.faqItems as Array<{ q: string; a: string }>).map((item, i: number) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="bg-white/70 backdrop-blur border border-gray-100 rounded-[28px] px-6 py-5 cursor-pointer hover:border-red-200 hover:shadow-[0_18px_50px_rgba(17,24,39,0.10)] transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="font-extrabold text-lg md:text-xl pr-4 leading-snug">{item.q}</div>
                  <span className="text-3xl text-gray-300 transition-transform">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <p className="mt-4 text-gray-600 leading-relaxed animate-in fade-in duration-300">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-14 leading-relaxed shadow-[0_-18px_60px_rgba(255,0,0,0.20)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl flex-shrink-0">🛡️</span>
            <h3 className="text-lg font-bold uppercase tracking-wider">{t.complianceTitle}</h3>
          </div>
          <div className="text-base opacity-95 pl-13">
            {t.compliance}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* 左侧：QRHub */}
          <div className="space-y-6">
            <div className="flex items-center gap-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-[8px] flex items-center justify-center">
                <div className="w-[40%] h-[40%] grid grid-cols-2 gap-[1px]">
                  <div className="bg-white"></div>
                  <div className="bg-white"></div>
                  <div className="bg-white"></div>
                  <div className="grid grid-cols-2 gap-[1px]">
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold">QRHub</div>
            </div>
            <p className="text-gray-400 text-base">{t.tagline}</p>
            <p className="text-gray-300 leading-relaxed text-xs">
              📍 {t.address}
            </p>
          </div>

          {/* 中间：联系方式 */}
          <div id="contact" className="space-y-6 text-sm md:text-center pt-1">
            <div className="font-semibold text-lg">{t.footer.contact}</div>
            <div className="flex flex-col text-gray-400 items-start md:items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl w-6">✉️</span>
                  <span>{t.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl w-6">📱</span>
                  <span>{t.contact.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：快速链接 */}
          <div className="space-y-6 text-sm pt-1 md:pl-32">
            <div className="font-semibold text-lg">{t.footer.quickLinks}</div>
            <div className="flex flex-col gap-y-4 text-gray-400 items-start">
              <button onClick={() => scrollToSection('features')} className="hover:text-red-400 transition-colors text-left">{t.nav.features}</button>
              <button onClick={() => scrollToSection('process')} className="hover:text-red-400 transition-colors text-left">{t.nav.process}</button>
              <button onClick={() => scrollToSection('why')} className="hover:text-red-400 transition-colors text-left">{t.nav.why}</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-red-400 transition-colors text-left">{t.nav.faq}</button>
            </div>
          </div>
        </div>

        {/* 底部行：版权在中间，隐私政策和服务条款在右边 */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-xs text-gray-400">
            <div className="hidden md:block order-3 md:order-1">
              {/* 占位，保持版权居中 */}
            </div>
            
            <div className="text-center order-1 md:order-2">
              {t.footer.copyright}
            </div>

            <div className="flex justify-center md:justify-end gap-6 order-2 md:order-3">
              <Link href={`/${lang}/privacy`} className="hover:text-red-400 transition-colors">{t.footer.privacy}</Link>
              <Link href={`/${lang}/terms`} className="hover:text-red-400 transition-colors">{t.footer.terms}</Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
