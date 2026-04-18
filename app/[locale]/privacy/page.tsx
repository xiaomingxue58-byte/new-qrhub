'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import zh from '../../locales/zh.json';
import en from '../../locales/en.json';
import id from '../../locales/id.json';

type Language = 'zh' | 'en' | 'id';

const translations: Record<Language, any> = { zh, en, id };

export default function PrivacyPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as Language) || 'id';
  const [lang, setLang] = useState<Language>(locale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 更新页面标题
    if (translations[lang]?.privacy?.title) {
      document.title = `${translations[lang].privacy.title} | QRHub`;
    }
  }, [lang]);

  if (!mounted) {
    return null; // 避免服务端和客户端渲染不一致导致的问题
  }

  const t = translations[lang];

  // 辅助函数：根据语言获取返回按钮文字
  const getBackText = (l: Language) => {
    if (l === 'zh') return '返回首页';
    if (l === 'en') return 'Back to Home';
    return 'Kembali ke Beranda';
  };

  // 切换语言函数：更新 URL 并同步状态
  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    router.push(`/${newLang}/privacy`);
  };

  return (
    <div className="min-h-screen bg-white font-sans p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link href={`/${lang}`} className="text-red-600 hover:underline font-medium">
            ← {getBackText(lang)}
          </Link>
          <div className="flex gap-4 text-sm font-bold text-gray-400">
            <button onClick={() => changeLanguage('id')} className={lang === 'id' ? 'text-red-600' : 'hover:text-gray-600'}>ID</button>
            <button onClick={() => changeLanguage('en')} className={lang === 'en' ? 'text-red-600' : 'hover:text-gray-600'}>EN</button>
            <button onClick={() => changeLanguage('zh')} className={lang === 'zh' ? 'text-red-600' : 'hover:text-gray-600'}>ZH</button>
          </div>
        </div>
        
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t.privacy.title}</h1>
          <p className="text-sm text-gray-500">{t.privacy.lastUpdated}</p>
        </div>

        <div className="space-y-10">
          {t.privacy.sections.map((section: any) => (
            <div key={section.id} className="prose prose-red max-w-none">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{section.content}</p>
              
              {section.id === 6 && (
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
  );
}
