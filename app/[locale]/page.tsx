'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import heroIllustration from '../../images/hero-illustration.png';
import zhCommon from '../locales/zh.json';
import enCommon from '../locales/en.json';
import idCommon from '../locales/id.json';

type Language = 'zh' | 'en' | 'id';
type CommonKey = keyof typeof zhCommon;

const translations = {
  zh: {
    nav: { features: '功能', process: '流程', why: '为什么选择我们', faq: '常见问题' },
    hero: {
      title: '通过社交，让生意变简单',
      subtitle: '通过社交入口申请和在线一步引导，帮助您的生意轻松完成统一二维码对接。需要技术集成时可使用标准 API，操作简单透明。',
      btnApply: '通过社交入口申请',
      btnGuide: '立即开始引导',
    },
    stats: {
      boost: '30%+',
      label1: '转化率提升',
      coverage: '100%',
      label2: 'QRIS 覆盖',
      steps: '3步',
      label3: '快速接入',
    },
    section2: {
      badge: '我们提供什么',
      title: '一次集成，全面覆盖',
      desc: 'QRHub 提供一次集成，满足您 95% 的日常在线交易需求',
      card1: { 
        title: '社交入口申请', 
        desc: '常用社交账号一键启动',
        features: ['一键登录', '支持多种社交平台', '无需重复验证']
      },
      card2: { 
        title: '自动在线引导', 
        desc: '一步填写，系统自动推进',
        features: ['智能表单引导', '实时进度追踪', '自动状态更新']
      },
      card3: { 
        title: '标准 API 支持', 
        desc: '(可选) 需要时用于系统深度集成',
        features: ['RESTful API', '完整开发文档', '沙箱测试环境']
      },
    },
    section3: {
      progress: '接入进度',
      title: '接入流程',
      subtitle: '简单三步，快速完成 QRIS 接入，全程自动化，省时省力',
      realTime: '实时更新',
      estTime: '预计完成',
      only3Steps: '只需 3 步',
      step1: { title: '通过社交入口申请', desc: '使用常用社交账号快速启动申请流程' },
      step2: { title: '在线一步填写基本信息', desc: '简单填写必要信息，系统自动验证' },
      step3: { title: '系统自动推进对接并实时查看进度', desc: '持牌机构负责审核激活，全程自动化，省时省力' },
    },
    why: {
      badge: '为什么选择我们',
      title: '简单、智能、高效',
      desc: '我们的解决方案为您的业务提供最便捷的集成体验',
      card1: '社交入口，一键申请',
      card2: '一步引导，操作简单',
      card3: '自动推进，无需反复沟通',
      card4: 'API 可选，灵活方便',
      dashboard: {
        title: '控制面板',
        stat1: 'PCI DSS',
        stat2: '全天候',
        volume: '交易量',
      }
    },
    faq: {
      title: '您可能想问的问题',
      subtitle: '如有其他疑问，欢迎随时联系支持团队',
      contact: '联系我们',
    },
    faqItems: [
      { q: '这是支付平台吗？', a: '不是。我们是技术集成与在线流程支持平台，实际交易由持牌支付机构处理。' },
      { q: '实际交易由谁处理？', a: '实际资金流转由合作持牌支付通道负责，我们只负责技术与流程支持。' },
      { q: '不懂技术也能用吗？', a: '完全可以！社交入口 + 自动引导让零代码商户 3 步完成接入。' },
      { q: '一定要用 API 吗？', a: '不需要。API 是可选功能，大部分商户仅使用社交入口和在线引导即可。' },
    ],
    tagline: '一站式 QRIS 技术集成平台',
    address: '英菲尼迪办公室，Arcade 商务中心 6 楼 Unit 6-03, Jalan Pantai Indah Utara 2 PIK Penjaringan, Desa/Kelurahan Kapuk Muara, Kec. Penjaringan, Kota Adm. Jakarta Utara, Provinsi DKI Jakarta, Kode 邮政编码：14460',
    complianceTitle: '合规声明',
    compliance: '我们是技术集成与在线流程支持平台，提供社交入口申请、自动在线引导和可选标准 API 服务。我们不参与任何资金处理或支付服务。实际交易与资金结算由持牌支付通道负责，并严格遵守当地法律法规。',
    footer: {
      privacy: '隐私政策',
      terms: '服务条款',
      contact: '联系我们',
      quickLinks: '快速链接',
      copyright: '© 2026 PT BINTANG LAUT INTEGRASI • 保留所有权利',
    },
  },
  en: {
    nav: { features: 'Features', process: 'Process', why: 'Why Us', faq: 'FAQ' },
    hero: {
      title: 'Go Social, Make Business Simple',
      subtitle: 'Apply via social login and guided online steps to easily connect your business to unified QR code. Use standard API for technical integration — simple and transparent.',
      btnApply: 'Apply via Social',
      btnGuide: 'Start Guide Now',
    },
    stats: {
      boost: '30%+',
      label1: 'Conversion Boost',
      coverage: '100%',
      label2: 'QRIS Coverage',
      steps: '3 Steps',
      label3: 'Fast Integration',
    },
    section2: {
      badge: 'What We Offer',
      title: 'One Integration, Full Coverage',
      desc: 'QRHub provides one integration that meets 95% of your daily online transaction needs',
      card1: { 
        title: 'Social Login', 
        desc: 'One-click with popular social accounts',
        features: ['One-click login', 'Multi-platform support', 'No repeat verification']
      },
      card2: { 
        title: 'Auto Online Guide', 
        desc: 'Fill once, system auto advances',
        features: ['Smart form guide', 'Real-time tracking', 'Auto status updates']
      },
      card3: { 
        title: 'Standard API', 
        desc: '(Optional) For deep system integration',
        features: ['RESTful API', 'Full documentation', 'Sandbox environment']
      },
    },
    section3: {
      progress: 'Integration Progress',
      title: 'Integration Process',
      subtitle: 'Three simple steps, quickly complete QRIS integration, fully automated, save time and effort',
      realTime: 'Real-time update',
      estTime: 'Estimated Completion',
      only3Steps: 'Only 3 Steps',
      step1: { title: 'Social Login Application', desc: 'Quickly start the application process using your common social accounts' },
      step2: { title: 'Online Quick Form', desc: 'Simply fill in necessary info, system verifies automatically' },
      step3: { title: 'Auto-Advancing Process and Real-time Status', desc: 'Licensed institutions handle review and activation, fully automated, time-saving' },
    },
    why: {
      badge: 'Why Choose Us',
      title: 'Simple. Smart. Efficient.',
      desc: 'Our solution provides your business with the most convenient integration experience',
      card1: 'Social Entry, One-Click Apply',
      card2: 'Step-by-Step Guide, Simple',
      card3: 'Auto Progress, No Back-and-Forth',
      card4: 'API Optional, Flexible',
      dashboard: {
        title: 'Dashboard',
        stat1: 'PCI DSS',
        stat2: 'Support 24/7',
        volume: 'Volume',
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'If you have other questions, please contact our support team',
      contact: 'Contact Us',
    },
    faqItems: [
      { q: 'Is this a payment platform?', a: 'No. We are a technical integration and online process support platform. Actual transactions are handled by licensed payment providers.' },
      { q: 'Who processes the actual transactions?', a: 'Actual funds flow is handled by licensed payment channels. We only provide technical and process support.' },
      { q: 'Can I use it without technical knowledge?', a: 'Yes! Social login + auto guide lets zero-code merchants complete onboarding in 3 steps.' },
      { q: 'Do I have to use the API?', a: 'No. API is optional. Most merchants only need social login and the online guide.' },
    ],
    tagline: 'One-Stop QRIS Technology Integration Platform',
    address: 'Infiniti Office, Arcade Business Center 6th Floor Unit 6-03, Jalan Pantai Indah Utara 2 PIK Penjaringan, Desa/Kelurahan Kapuk Muara, Kec. Penjaringan, Kota Adm. Jakarta Utara, Provinsi DKI Jakarta, Postal Code: 14460',
    complianceTitle: 'Compliance Disclaimer',
    compliance: 'We are a technical integration and online process support platform, offering social login application, automatic online guidance, and optional standard API service. We do not participate in any fund handling or payment services. Actual transactions and fund settlement are handled by licensed payment channels and strictly comply with local laws and regulations.',
    footer: {
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      contact: 'Contact Us',
      quickLinks: 'Quick Links',
      copyright: '© 2026 PT BINTANG LAUT INTEGRASI • All Rights Reserved',
    },
  },
  id: {
    nav: { features: 'Fitur', process: 'Proses', why: 'Mengapa Kami', faq: 'FAQ' },
    hero: {
      title: 'Lewat Sosial, Bisnis Jadi Lebih Mudah',
      subtitle: 'Ajukan melalui login sosial dan panduan langkah demi langkah online. Bisnis Anda mudah terhubung ke kode QR terpadu. Gunakan API standar jika butuh integrasi teknis — sederhana dan transparan.',
      btnApply: 'Ajukan via Sosial',
      btnGuide: 'Mulai Panduan',
    },
    stats: {
      boost: '30%+',
      label1: 'Peningkatan Konversi',
      coverage: '100%',
      label2: 'Cakupan QRIS',
      steps: '3 Langkah',
      label3: 'Integrasi Cepat',
    },
    section2: {
      badge: 'Apa yang Kami Tawarkan',
      title: 'Satu Integrasi, Cakupan Lengkap',
      desc: 'QRHub memberikan satu integrasi yang memenuhi 95% kebutuhan transaksi online harian Anda',
      card1: { 
        title: 'Login Sosial', 
        desc: 'One-click dengan akun sosial populer',
        features: ['Login sekali klik', 'Dukungan multi-platform', 'Tanpa verifikasi ulang']
      },
      card2: { 
        title: 'Panduan Otomatis', 
        desc: 'Isi sekali, sistem otomatis maju',
        features: ['Panduan formulir pintar', 'Pelacakan real-time', 'Pembaruan status otomatis']
      },
      card3: { 
        title: 'API Standar', 
        desc: '(Opsional) Untuk integrasi sistem mendalam',
        features: ['RESTful API', 'Dokumentasi lengkap', 'Lingkungan sandbox']
      },
    },
    section3: {
      progress: 'Progres Integrasi',
      title: 'Alur Integrasi',
      subtitle: 'Tiga langkah mudah, selesaikan integrasi QRIS dengan cepat, otomatis penuh, hemat waktu',
      realTime: 'Pembaruan Real-time',
      estTime: 'Estimasi Selesai',
      only3Steps: 'Hanya 3 Langkah',
      step1: { title: 'Ajukan via Login Sosial', desc: 'Mulai proses aplikasi dengan cepat menggunakan akun sosial Anda' },
      step2: { title: 'Isi Data Online', desc: 'Isi informasi yang diperlukan, sistem verifikasi otomatis' },
      step3: { title: 'Proses Otomatis dan Pantau Progres', desc: 'Lembaga berlisensi menangani tinjauan dan aktivasi, otomatis penuh, hemat waktu' },
    },
    why: {
      badge: 'Mengapa Memilih Kami',
      title: 'Sederhana. Pintar. Efisien.',
      desc: 'Solusi kami memberikan pengalaman integrasi termudah bagi bisnis Anda',
      card1: 'Akses Sosial, Daftar Sekali Klik',
      card2: 'Panduan Bertahap, Operasi Mudah',
      card3: 'Progres Otomatis, Tanpa Komunikasi Berulang',
      card4: 'Opsi API, Fleksibel & Nyaman',
      dashboard: {
        title: 'Panel Kontrol',
        stat1: 'PCI DSS',
        stat2: '24 Jam',
        volume: 'Volume Transaksi',
      }
    },
    faq: {
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Jika Anda memiliki pertanyaan lain, silakan hubungi tim dukungan kami',
      contact: 'Hubungi Kami',
    },
    faqItems: [
      { q: 'Apakah ini platform pembayaran?', a: 'Tidak. Kami adalah platform integrasi teknis dan dukungan proses online. Transaksi aktual ditangani oleh penyedia pembayaran berlisensi.' },
      { q: 'Siapa yang memproses transaksi aktual?', a: 'Alur dana aktual ditangani oleh channel pembayaran berlisensi. Kami hanya menyediakan dukungan teknis dan proses.' },
      { q: 'Bisa digunakan tanpa pengetahuan teknis?', a: 'Bisa! Login sosial + panduan otomatis memungkinkan merchant tanpa coding menyelesaikan onboarding hanya dalam 3 langkah.' },
      { q: 'Harus pakai API?', a: 'Tidak. API opsional. Sebagian besar merchant hanya butuh login sosial dan panduan online.' },
    ],
    tagline: 'Platform Integrasi Teknologi QRIS Satu Pintu',
    address: 'Infiniti Office, Arcade Business Center 6th Floor Unit 6-03, Jalan Pantai Indah Utara 2 PIK Penjaringan, Desa/Kelurahan Kapuk Muara, Kec. Penjaringan, Kota Adm. Jakarta Utara, Provinsi DKI Jakarta, Kode Pos: 14460',
    complianceTitle: 'Pernyataan Kepatuhan',
    compliance: 'Kami adalah platform integrasi teknis dan dukungan proses online, menyediakan aplikasi masuk sosial, panduan online otomatis, dan layanan API standar opsional. Kami tidak terlibat dalam pemrosesan dana atau layanan pembayaran apa pun. Transaksi aktual dan penyelesaian dana ditangani oleh channel pembayaran berlisensi dan mematuhi ketentuan hukum setempat.',
    footer: {
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat & Ketentuan',
      contact: 'Hubungi Kami',
      quickLinks: 'Tautan Cepat',
      copyright: '© 2026 PT BINTANG LAUT INTEGRASI • Hak Cipta Dilindungi',
    },
  },
};

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as Language) || 'id';
  
  const [lang, setLang] = useState<Language>(locale);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 更新页面标题
    if (translations[lang]?.tagline) {
      document.title = `QRHub - ${translations[lang].tagline}`;
    }
  }, [lang]);

  const commonI18n = { zh: zhCommon, en: enCommon, id: idCommon } as const;
  const i18nText = commonI18n[lang];
  const t = Object.assign(
    (key: CommonKey) => i18nText[key],
    translations[lang]
  ) as ((key: CommonKey) => string) & (typeof translations)[Language];

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    setShowLangMenu(false);
    setMobileMenuOpen(false);
    router.push(`/${newLang}`);
  };

  if (!mounted) return null;

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
    <div className="min-h-screen bg-white font-sans overflow-x-hidden pt-14">
      {/* NAVBAR - 保持不变 */}
      <nav className="bg-white/95 backdrop-blur fixed inset-x-0 top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
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
                  className="flex items-center gap-x-1.5 px-2 py-1 text-sm font-semibold hover:text-red-600 transition-colors"
                >
                  <span className="text-base leading-none">
                    {lang === 'zh' ? '🇨🇳' : lang === 'en' ? '🇬🇧' : '🇮🇩'}
                  </span>
                  <span>{lang.toUpperCase()}</span>
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-2xl shadow-xl py-2 z-50 text-sm overflow-hidden">
                    <button onClick={() => changeLanguage('id')} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left">🇮🇩 Bahasa Indonesia</button>
                    <button onClick={() => changeLanguage('zh')} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left">🇨🇳 中文</button>
                    <button onClick={() => changeLanguage('en')} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left">🇬🇧 English</button>
                  </div>
                )}
              </div>

              <div className="relative md:hidden">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-x-2 border rounded-3xl px-4 h-9 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl">
                    {lang === 'zh' ? '🇨🇳' : lang === 'en' ? '🇬🇧' : '🇮🇩'}
                  </span>
                  <span className="font-semibold">{lang.toUpperCase()}</span>
                </button>

                {showLangMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-2xl shadow-xl py-2 z-50 text-sm overflow-hidden">
                    <button onClick={() => changeLanguage('id')} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left">🇮🇩 Bahasa Indonesia</button>
                    <button onClick={() => changeLanguage('zh')} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left">🇨🇳 中文</button>
                    <button onClick={() => changeLanguage('en')} className="flex w-full items-center gap-x-3 px-4 py-2.5 hover:bg-gray-50 text-left">🇬🇧 English</button>
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
                onClick={() => { alert('🚀 已跳转至社交入口申请页（演示）'); setMobileMenuOpen(false); }}
                className="bg-red-600 text-white w-full py-4 rounded-2xl font-bold text-center shadow-lg active:scale-95 transition-all"
              >
                {t.hero.btnApply}
              </button>

              <div className="pt-6 border-t text-sm">
                <div className="font-medium text-gray-500 mb-4 uppercase tracking-wider">Language</div>
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={() => { setLang('id'); setMobileMenuOpen(false); }} className="flex items-center gap-3">🇮🇩 Bahasa Indonesia</button>
                  <button onClick={() => { setLang('zh'); setMobileMenuOpen(false); }} className="flex items-center gap-3">🇨🇳 中文</button>
                  <button onClick={() => { setLang('en'); setMobileMenuOpen(false); }} className="flex items-center gap-3">🇬🇧 English</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <header className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid md:grid-cols-5 gap-10 items-center">
        <div className="space-y-8 w-full md:col-span-3">
          <h1 className="text-[2rem] md:text-[2.6rem] font-bold leading-[1.1] tracking-[-1px] text-balance">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 w-full md:w-[45vw] md:max-w-[45vw] leading-relaxed mt-12 md:mt-24">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-8 md:pt-14 md:max-w-[92%]">
            <button
              onClick={() => alert('🚀 已跳转至社交入口申请页（演示）')}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-3xl font-semibold flex items-center justify-center gap-x-3 text-base md:text-[1rem] active:scale-95 transition-all shadow-md"
            >
              {t.hero.btnApply} →
            </button>
            <button
              onClick={() => alert('🎯 已启动在线引导流程（演示）')}
              className="w-full sm:w-auto border-2 border-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-3xl font-semibold text-base md:text-[1rem] flex items-center justify-center active:scale-95 transition-all"
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
            alt="QRHub 平台接入流程示意图"
            priority
            className="w-full max-w-[1244px] sm:max-w-[1693px] md:max-w-[2039px] h-auto object-contain drop-shadow-[0_24px_45px_rgba(220,38,38,0.16)]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 2039px"
          />
        </figure>
      </header>

      {/* FEATURES */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-pink-100 text-pink-700 text-sm font-semibold px-6 py-2 rounded-3xl mb-3">
              {t.section2.badge}
            </div>
            <h2 className="text-4xl font-bold tracking-tight">{t.section2.title}</h2>
            <p className="mt-3 text-lg text-gray-600">{t.section2.desc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-7 border hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-4xl mb-6">💬</div>
              <h3 className="font-bold text-2xl">{t.section2.card1.title}</h3>
              <p className="text-gray-500 mt-1">{t.section2.card1.desc}</p>
              <ul className="mt-8 space-y-4 text-sm">
                {t.section2.card1.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-4xl mb-6">⚡</div>
              <h3 className="font-bold text-2xl">{t.section2.card2.title}</h3>
              <p className="text-gray-500 mt-1">{t.section2.card2.desc}</p>
              <ul className="mt-8 space-y-4 text-sm">
                {t.section2.card2.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-green-500 text-xl">✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-4xl mb-6">{'</>'}</div>
              <h3 className="font-bold text-2xl">{t.section2.card3.title}</h3>
              <p className="text-gray-500 mt-1">{t.section2.card3.desc}</p>
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
      <section id="process" className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-12 gap-12 items-center">
        {/* Left Card: Progress */}
        <div className="md:col-span-6 bg-white border border-gray-100 rounded-[32px] px-12 py-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative">
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
            <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-6">
              {t.section3.only3Steps}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              {t.section3.title}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
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
                  <span className="text-xs font-black text-red-600 tracking-tighter uppercase">STEP 1</span>
                  <h3 className="font-bold text-xl text-gray-900">{t.section3.step1.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{t.section3.step1.desc}</p>
              </div>
            </div>
            
            <div className="flex gap-6 group">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-105">
                <span>�</span>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="text-xs font-black text-red-600 tracking-tighter uppercase">STEP 2</span>
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
                  <span className="text-xs font-black text-red-600 tracking-tighter uppercase">STEP 3</span>
                  <h3 className="font-bold text-xl text-gray-900">{t.section3.step3.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{t.section3.step3.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <div className="md:col-span-6">
            <div className="inline-block bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              {t.why.badge}
            </div>
            <h2 className="text-[56px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              {t.why.title}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-lg">
              {t.why.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 text-xl">👥</span>
                </div>
                <span className="font-medium text-gray-700 text-sm leading-snug">{t.why.card1}</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 text-xl">✔️</span>
                </div>
                <span className="font-medium text-gray-700 text-sm leading-snug">{t.why.card2}</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 text-xl">⚡</span>
                </div>
                <span className="font-medium text-gray-700 text-sm leading-snug">{t.why.card3}</span>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 text-xl">{'</>'}</span>
                </div>
                <span className="font-medium text-gray-700 text-sm leading-snug">{t.why.card4}</span>
              </div>
            </div>
          </div>

          {/* Right Dashboard Card */}
          <div className="md:col-span-6 flex justify-end">
            <div className="w-full max-w-[540px] bg-white border border-gray-50 rounded-[32px] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
              <div className="flex justify-between items-center mb-10">
                <span className="font-bold text-gray-900 text-lg">{t.why.dashboard.title}</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-50/50">
                  <div className="text-[32px] font-bold text-emerald-500 mb-1">98%</div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>🛡️</span> {t.why.dashboard.stat1}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-50/50">
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
      <section id="faq" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 bg-pink-100 text-pink-700 px-5 py-2 rounded-3xl w-fit mb-6">
              ❔ <span className="font-medium">{t.faq.title}</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight">{t.faq.title}</h2>
            <p className="text-gray-600 mt-3">{t.faq.subtitle}</p>

            <button
              onClick={scrollToContact}
              className="mt-8 bg-red-600 text-white px-8 h-12 rounded-3xl flex items-center gap-3 hover:bg-red-700 transition-colors shadow-md active:scale-95"
            >
              📞 {t.faq.contact}
            </button>
          </div>

          <div className="md:col-span-7 space-y-3">
            {t.faqItems.map((item, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="border rounded-3xl px-6 py-5 cursor-pointer hover:border-red-200 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium text-base pr-4">{item.q}</div>
                  <span className="text-3xl text-gray-300 transition-transform">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && <p className="mt-4 text-gray-600 leading-relaxed animate-in fade-in duration-300">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <div className="bg-red-600 text-white py-12 leading-relaxed">
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
                  <span>bisnis@qrhub.one</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl w-6">📱</span>
                  <span>+62 0855 9154 1906</span>
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
  );
}
