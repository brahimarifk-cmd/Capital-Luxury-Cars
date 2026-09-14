import React from 'react';
import { X, Crown, Sparkles, Gift, ShieldCheck, ChevronRight, Zap, TrendingUp, Car } from 'lucide-react';
import { Language } from '../types';
import { VIP_TIERS } from '../data/mockData';

interface WelcomePromoModalProps {
  language: Language;
  onClose: () => void;
  onProceedToLuckyWheel: () => void;
  onGoToVip: () => void;
}

export const WelcomePromoModal: React.FC<WelcomePromoModalProps> = ({
  language,
  onClose,
  onProceedToLuckyWheel,
  onGoToVip,
}) => {
  const isAr = language === 'ar';
  // Highlighted VIP tiers to attract newcomers
  const promoTiers = VIP_TIERS.slice(1, 5); // VIP1 to VIP4

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-red-100 my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header with Supercar Banner */}
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 text-white p-5 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-1.5 bg-red-600/90 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isAr ? 'أسطول السيارات الفاخرة' : 'Capital Luxury Cars Fleet'}</span>
          </div>
          <h2 className="text-lg font-black text-white leading-tight">
            {isAr
              ? 'مرحباً بك! ضاعف أرباحك اليومية مع باقات VIP الحصرية'
              : 'Welcome! Maximize Daily Profits with Exclusive VIP Tiers'}
          </h2>
          <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
            {isAr
              ? 'المنصة العالمية الرائدة لتأجير أسطول السيارات الرياضية. أتمم المهام اليومية، استلم أرباحك فوراً وسحب مؤكد خلال 24 ساعة!'
              : 'Premier global luxury car fleet rental investment platform. Complete daily tasks, enjoy instant daily returns and guaranteed 24h withdrawals!'}
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-gray-700 flex-1">
          {/* Why Upgrade Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 text-xs">
                {isAr ? 'لماذا الترقية لباقات VIP الأعلى؟' : 'Why Upgrade to Higher VIP Tiers?'}
              </h4>
              <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                {isAr
                  ? 'باقة VIP0 تجريبية. الترقية إلى VIP1 فما فوق تفتح لك السحب الفوري المباشر وأرباحاً متضاعفة تبدأ من 7.50$ وتصل حتى 900$ يومياً!'
                  : 'VIP0 is for trial. Upgrading to VIP1+ unlocks instant withdrawals and multiplied returns up to $900 daily!'}
              </p>
            </div>
          </div>

          {/* Attractive VIP Tier Cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-900 text-xs flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>{isAr ? 'أبرز باقات VIP المتاحة:' : 'Most Lucrative VIP Packages:'}</span>
              </span>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                {isAr ? 'عائد يومي مضمون' : 'Guaranteed Daily'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {promoTiers.map((tier) => (
                <div
                  key={tier.level}
                  className="bg-gray-50 hover:bg-red-50/50 border border-gray-200 hover:border-red-300 rounded-2xl p-2.5 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900 bg-white px-2 py-0.5 rounded-lg border border-gray-100 shadow-xs">
                        {tier.level}
                      </span>
                      <span className="text-[10px] font-extrabold text-red-600">
                        {tier.price} USDT
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-600 truncate mt-1.5 flex items-center gap-1">
                      <Car className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{tier.car}</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-gray-200/80 flex items-center justify-between text-[11px]">
                    <span className="text-gray-500 text-[10px]">{isAr ? 'يومياً:' : 'Daily:'}</span>
                    <span className="font-black text-emerald-600">+{tier.daily.toFixed(2)} $</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Platform Highlights */}
          <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-gray-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isAr ? 'معالجة وسحب الأرباح خلال 24 ساعة بأمان تام' : 'Guaranteed 24h withdrawal processing with full security'}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-700">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{isAr ? 'تجدد عجلة الحظ كل 24 ساعة لربح جوائز USDT مجانية' : 'Free lucky draw refill every 24 hours to win free USDT prizes'}</span>
            </div>
          </div>

          {/* Gift Welcome Wheel Prompt */}
          <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-amber-300">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs">
                  {isAr ? 'مكافأة التسجيل جاهزة!' : 'Welcome Gift Ready!'}
                </h5>
                <p className="text-[10px] text-red-100">
                  {isAr ? 'دور عجلة الحظ الآن لربح رصيد مجاني' : 'Spin the lucky wheel now for free cash'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-2">
          <button
            type="button"
            onClick={onProceedToLuckyWheel}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-lg transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4 text-amber-300" />
            <span>{isAr ? 'المتابعة إلى عجلة الحظ واستلام الفرصة 🎁' : 'Continue to Lucky Wheel & Claim Spin 🎁'}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={onGoToVip}
            className="w-full bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold text-xs py-2.5 rounded-2xl transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAr ? 'استعراض وترقية باقات VIP' : 'Explore & Upgrade VIP Tiers'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
