import React from 'react';
import { Gift, Wallet, Building2, Gauge, Lock, ArrowRight, ArrowLeft, Crown, Clock } from 'lucide-react';
import { Language, LivePayout, UserState } from '../types';
import { translations } from '../data/translations';
import { VIP_TIERS } from '../data/mockData';

interface HomeViewProps {
  userState: UserState;
  language: Language;
  onOpenLuckyWheel: () => void;
  onOpenWelcomePromo: () => void;
  luckyDrawCountdown?: string;
  onSwitchTab: (tab: 'task' | 'me' | 'vip') => void;
  onOpenPayment: (level: string, cost: number) => void;
  onShowCompanyInfo: () => void;
  livePayouts: LivePayout[];
  formattedCountdown: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userState,
  language,
  onOpenLuckyWheel,
  onOpenWelcomePromo,
  luckyDrawCountdown,
  onSwitchTab,
  onOpenPayment,
  onShowCompanyInfo,
  livePayouts,
  formattedCountdown,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-4 pb-4">
      {/* Balance & Welcome Card */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-red-950 text-white rounded-3xl p-5 shadow-xl border border-gray-800">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block bg-red-600/80 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-red-100">
              {t.welcome} • {userState.vipLevel}
            </span>
            <h2 className="font-bold text-lg mt-1.5">{t.saveMoneyTime}</h2>
            <p className="text-xs text-gray-300 mt-1 max-w-[260px] leading-relaxed">
              {t.welcomeDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenLuckyWheel}
            className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition active:scale-95 shadow cursor-pointer text-amber-300"
            title={t.luckyDraw}
          >
            <Gift className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-gray-400 font-medium">{t.accountBalance}</p>
            <p className="font-extrabold text-base mt-0.5 text-white">
              {userState.balance.toFixed(2)} <span className="text-xs text-red-400 font-semibold">USDT</span>
            </p>
          </div>
          <div
            onClick={onOpenLuckyWheel}
            className="bg-white/5 hover:bg-white/10 rounded-2xl p-3 border border-white/5 cursor-pointer transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-gray-400 font-medium">{t.luckyDraw}</p>
              <Gift className="w-3.5 h-3.5 text-amber-300" />
            </div>
            {userState.luckyDrawRemaining > 0 ? (
              <p className="font-extrabold text-base mt-0.5 text-amber-300">
                {userState.luckyDrawRemaining} <span className="text-xs text-gray-300 font-normal">{t.chances}</span>
              </p>
            ) : (
              <div className="mt-0.5">
                <span className="text-xs text-gray-400 font-bold block">0 {t.chances}</span>
                <span className="text-[10px] text-amber-300/90 font-mono font-bold flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{luckyDrawCountdown || '24:00:00'}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prominent VIP Introduction & Attraction Banner */}
      <button
        type="button"
        onClick={onOpenWelcomePromo}
        className="w-full bg-gradient-to-r from-amber-500 via-rose-600 to-red-700 text-white rounded-3xl p-3.5 shadow-md flex items-center justify-between hover:opacity-95 transition active:scale-98 cursor-pointer text-start"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 text-amber-200">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 px-2 py-0.5 rounded-full text-amber-200">
                {isRtl ? 'دليل وباقات VIP' : 'VIP Guide & Tiers'}
              </span>
              <span className="text-[10px] font-bold text-amber-100 flex items-center gap-0.5">
                <Gift className="w-3 h-3" />
                {isRtl ? '+ عجلة الحظ' : '+ Lucky Wheel'}
              </span>
            </div>
            <h4 className="font-black text-xs text-white mt-1">
              {isRtl
                ? 'استكشف المنصة واشترك في باقات VIP لربح يصل إلى 900$ يومياً!'
                : 'Explore Platform & Join VIP Tiers to Earn Up to $900 Daily!'}
            </h4>
          </div>
        </div>
        <ArrowIcon className="w-4 h-4 text-white shrink-0" />
      </button>

      {/* Official Platform Header */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Official Platform
          </span>
          <h3 className="font-bold text-gray-900 text-sm mt-1">{t.appName} Fleet</h3>
          <p className="text-[11px] text-gray-500 mt-0.5">{t.dailySettlement}</p>
        </div>
        <div className="bg-red-50 text-red-600 p-3 rounded-2xl flex items-center justify-center">
          <Gauge className="w-6 h-6" />
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSwitchTab('me')}
          className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition text-start cursor-pointer active:scale-95"
        >
          <div className="bg-red-100 text-red-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">{t.recharge}</h4>
            <p className="text-[10px] text-gray-400">{t.addUsdt}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={onShowCompanyInfo}
          className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition text-start cursor-pointer active:scale-95"
        >
          <div className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">{t.company}</h4>
            <p className="text-[10px] text-gray-400">{t.companyDesc}</p>
          </div>
        </button>
      </div>

      {/* Hero Promotional Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg bg-gradient-to-r from-red-600 to-red-900 text-white p-4">
        <div className="z-10 relative">
          <span className="bg-white/20 text-[10px] px-2.5 py-0.5 rounded-full font-semibold inline-block">
            {t.globalFleet}
          </span>
          <h3 className="font-bold text-base mt-1.5">{t.ferrariPorsche}</h3>
          <p className="text-[11px] text-red-100 mt-1">{t.dailySettlement}</p>
        </div>
        <div className="mt-3 rounded-2xl overflow-hidden h-36 bg-gray-900 relative border border-white/15">
          <img
            src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80"
            alt="Supercar Fleet"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>

      {/* Fleet Product Cards (Top 4 tiers) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
            <span>{t.exclusiveModels}</span>
          </h3>
          <span className="text-xs text-red-600 font-semibold flex items-center gap-1">
            <span>{t.dailyReset}</span>
            <span className="font-mono bg-red-50 px-1.5 py-0.5 rounded text-red-700">{formattedCountdown}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {VIP_TIERS.slice(0, 4).map((tier) => {
            const isUserTier = userState.vipLevel === tier.level;
            const isUnlocked = userState.vipLevel >= tier.level;

            return (
              <div
                key={tier.level}
                className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div className="relative h-28 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={tier.image}
                    alt={tier.car}
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                  {!isUnlocked && tier.level !== 'VIP0' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <span className="absolute top-1.5 right-1.5 bg-gray-900/90 text-white text-[9px] px-2 py-0.5 rounded-md font-bold shadow">
                    {tier.level}
                  </span>
                </div>

                <div className="mt-2.5">
                  <p className="text-[10px] text-gray-500 font-medium truncate">{tier.car}</p>
                  <p className="font-bold text-gray-900 text-sm">
                    +{tier.daily.toFixed(2)} USDT <span className="text-[10px] font-normal text-gray-400">{t.daily}</span>
                  </p>
                </div>

                {tier.level === 'VIP0' || isUserTier ? (
                  <button
                    type="button"
                    onClick={() => onSwitchTab('task')}
                    className="mt-2.5 w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2 rounded-xl font-bold shadow-sm cursor-pointer active:scale-95 transition flex items-center justify-center gap-1"
                  >
                    <span>{t.activeFleet}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenPayment(tier.level, tier.price)}
                    className="mt-2.5 w-full bg-gray-900 hover:bg-black text-white text-xs py-2 rounded-xl font-bold shadow-sm cursor-pointer active:scale-95 transition"
                  >
                    {t.pay} ${tier.price}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Member Payout Notifications */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-xs flex items-center gap-1.5">
            <span>{t.livePayouts}</span>
          </h3>
          <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t.liveFeed}</span>
          </span>
        </div>
        <div className="space-y-2 text-xs">
          {livePayouts.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-gray-600 font-medium">
                <span className="text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded text-[10px] mr-1">
                  {item.vip}
                </span>{' '}
                {item.user}
              </span>
              <span className="text-emerald-600 font-bold">
                +${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
