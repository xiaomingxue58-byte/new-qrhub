'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import zh from '../../locales/zh.json';
import en from '../../locales/en.json';
import id from '../../locales/id.json';

type Language = 'zh' | 'en' | 'id';

type ContactDetails = {
  email: string;
  phone: string;
  address: string;
};

type PrivacySection = {
  id: number;
  title: string;
  content: string;
  email?: string;
  phone?: string;
  address?: string;
  details?: ContactDetails;
};

const translations = { zh, en, id } as const;

export default function PrivacyPage() {
  const params = useParams();
  const lang = ((params.locale as string) || 'id') as Language;
  const t = translations[lang];

  useEffect(() => {
    if (t?.privacy?.title) {
      document.title = `${t.privacy.title} | QRHub`;
    }
  }, [lang, t]);

  // 辅助函数：根据语言获取返回按钮文字
  const getBackText = (l: Language) => {
    if (l === 'zh') return '返回首页';
    if (l === 'en') return 'Back to Home';
    return 'Kembali ke Beranda';
  };

  return (
    <div className="min-h-screen bg-white font-sans p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 min-h-10">
          <Link
            href={`/${lang}`}
            prefetch
            className="text-red-600 hover:underline font-medium whitespace-nowrap"
          >
            ← {getBackText(lang)}
          </Link>
          <div className="flex gap-4 text-sm font-bold text-gray-400 min-w-[132px] justify-end">
            <Link
              href="/id/privacy"
              prefetch
              className={`${lang === 'id' ? 'text-red-600' : 'hover:text-gray-600'} whitespace-nowrap`}
            >
              ID
            </Link>
            <Link
              href="/en/privacy"
              prefetch
              className={`${lang === 'en' ? 'text-red-600' : 'hover:text-gray-600'} whitespace-nowrap`}
            >
              EN
            </Link>
            <Link
              href="/zh/privacy"
              prefetch
              className={`${lang === 'zh' ? 'text-red-600' : 'hover:text-gray-600'} whitespace-nowrap`}
            >
              ZH
            </Link>
          </div>
        </div>
        
        <div key={lang} className="qrh-fade-in">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t.privacy.title}</h1>
            <p className="text-sm text-gray-500">{t.privacy.lastUpdated}</p>
          </div>

          <div className="space-y-10">
            {t.privacy.sections.map((section: PrivacySection) => (
              <div key={section.id} className="prose prose-red max-w-none">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                
                {section.details && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-sm text-gray-600">
                    <p>{section.email || section.details?.email}</p>
                    <p>{section.phone || section.details?.phone}</p>
                    <p className="leading-relaxed">{section.address || section.details?.address}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
            PT BINTANG LAUT INTEGRASI
          </div>
        </div>
      </div>
    </div>
  );
}
