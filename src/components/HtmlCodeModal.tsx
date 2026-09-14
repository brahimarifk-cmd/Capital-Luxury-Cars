import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { STANDALONE_HTML_CODE } from '../data/standaloneHtml';

interface HtmlCodeModalProps {
  language: Language;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const HtmlCodeModal: React.FC<HtmlCodeModalProps> = ({ language, onClose, onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(STANDALONE_HTML_CODE);
      setCopied(true);
      onShowToast(language === 'ar' ? 'تم نسخ كود HTML الكامل بنجاح!' : 'HTML code copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onShowToast(language === 'ar' ? 'فشل النسخ، يرجى المحاولة يدوياً' : 'Failed to copy');
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([STANDALONE_HTML_CODE], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'capital-luxury-cars.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onShowToast(language === 'ar' ? 'تم تنزيل ملف capital-luxury-cars.html بنجاح!' : 'Downloaded HTML file successfully!');
    } catch {
      onShowToast(language === 'ar' ? 'فشل التنزيل' : 'Failed to download');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">
                {language === 'ar' ? 'كود صفحة موقع السيارات (HTML)' : 'Car Website HTML Code'}
              </h3>
              <p className="text-[11px] text-gray-500">
                {language === 'ar' ? 'صفحة متكاملة مستقلة جاهزة للتشغيل المباشر' : 'Self-contained standalone HTML page'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between py-3 gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-medium">
              {language === 'ar' ? 'ملف HTML مدمج بتنسيقات Tailwind وجافاسكريبت' : 'Includes Tailwind CSS & JS interactions'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ الكود' : 'Copy Code')}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-xl shadow transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تحميل HTML' : 'Download'}</span>
            </button>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="flex-1 overflow-hidden rounded-2xl bg-gray-950 border border-gray-800 relative flex flex-col">
          <div className="bg-gray-900 px-4 py-2 text-[11px] font-mono text-gray-400 flex justify-between items-center border-b border-gray-800">
            <span>capital-luxury-cars.html</span>
            <span className="text-emerald-400 font-bold">HTML5 / UTF-8</span>
          </div>
          <pre className="flex-1 p-4 text-[11px] text-emerald-300 font-mono overflow-auto whitespace-pre leading-relaxed select-all">
            <code>{STANDALONE_HTML_CODE}</code>
          </pre>
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer"
          >
            {language === 'ar' ? 'إغلاق المعاينة' : 'Close Preview'}
          </button>
        </div>
      </div>
    </div>
  );
};
