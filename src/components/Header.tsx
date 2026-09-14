import React from 'react';
import { Car, Globe, Headset, Code2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenSupport: () => void;
  onOpenHtmlCode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onOpenSupport,
  onOpenHtmlCode,
}) => {
  const t = translations[language];

  return (
    <header className="bg-red-600 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
      <div className="flex items-center gap-2.5">
        <div className="bg-white text-red-600 p-1.5 rounded-xl font-bold flex items-center justify-center w-8 h-8 shadow-sm">
          <Car className="w-5 h-5" />
        </div>
        <div>
          <span className="font-bold text-base tracking-tight block leading-tight">{t.appName}</span>
          <span className="text-[10px] text-red-100 block leading-none font-medium">VIP Fleet</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {onOpenHtmlCode && (
          <button
            type="button"
            onClick={onOpenHtmlCode}
            className="bg-black/30 hover:bg-black/40 text-amber-300 text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1 font-bold transition active:scale-95 cursor-pointer border border-amber-400/40"
            title={language === 'ar' ? 'عرض ونسخ كود HTML' : 'View HTML Code'}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">{language === 'ar' ? 'كود HTML' : 'HTML'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={onToggleLanguage}
          className="bg-white/20 hover:bg-white/30 text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 font-semibold transition active:scale-95 cursor-pointer"
          title="Switch Language"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'English' : 'العربية'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenSupport}
          className="bg-white/20 hover:bg-white/30 w-8 h-8 rounded-full flex items-center justify-center transition active:scale-95 cursor-pointer"
          title="Customer Support"
        >
          <Headset className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
