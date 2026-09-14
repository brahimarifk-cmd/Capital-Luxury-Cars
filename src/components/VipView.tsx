import React from 'react';
import { Crown, CheckCircle2, Sparkles } from 'lucide-react';
import { Language, UserState } from '../types';
import { translations } from '../data/translations';
import { VIP_TIERS } from '../data/mockData';

interface VipViewProps {
  userState: UserState;
  language: Language;
  onUpgradeTier: (level: string, price: number) => void;
  onOpenPayment: (level: string, price: number) => void;
}

export const VipView: React.FC<VipViewProps> = ({
  userState,
  language,
  onOpenPayment,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm">
            {language === 'ar' ? 'باقات أسطول السيارات (VIP0 - VIP9)' : 'VIP Investment Tiers (VIP0 - VIP9)'}
          </h3>
          <p className="text-[11px] text-gray-500">
            {language === 'ar' ? 'قم بالترقية لمضاعفة العائد اليومي وتمكين سحب الأرباح' : 'Upgrade to boost daily returns & enable withdrawals'}
          </p>
        </div>
        <span className="text-xs bg-red-50 text-red-600 font-bold px-2.5 py-1 rounded-full">
          {userState.vipLevel}
        </span>
      </div>

      <div className="space-y-3">
        {VIP_TIERS.map((tier) => {
          const isActive = userState.vipLevel === tier.level;
          const isHigher = userState.vipLevel > tier.level;

          return (
            <div
              key={tier.level}
              className={`bg-white rounded-3xl p-4 shadow-sm border transition ${
                isActive ? 'border-amber-400/80 ring-2 ring-amber-100' : 'border-gray-100'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-amber-100 text-amber-600 shadow-xs' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-gray-900 text-sm">{tier.level}</span>
                      <span className="text-xs font-semibold text-gray-400">({tier.car})</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : isHigher
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isActive ? t.currentActive : isHigher ? 'Unlocked' : t.locked}
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-2xl mb-3 border border-gray-100">
                <div>
                  <p className="text-gray-400 text-[10px]">{t.dailyTasks}</p>
                  <p className="font-bold text-gray-800 text-xs mt-0.5">1 Order</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px]">{t.dailyProfit}</p>
                  <p className="font-extrabold text-emerald-600 text-xs mt-0.5">
                    +{tier.daily.toFixed(2)} USDT
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px]">{t.totalReturn}</p>
                  <p className="font-bold text-blue-600 text-xs mt-0.5">{tier.total.toFixed(2)} USDT</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px]">{t.unlockCost}</p>
                  <p className="font-extrabold text-gray-900 text-xs mt-0.5">
                    {tier.price.toFixed(2)} USDT
                  </p>
                </div>
              </div>

              {/* Action */}
              {isActive ? (
                <div className="text-center text-xs text-emerald-700 font-bold py-2 bg-emerald-50 rounded-xl flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.currentlyDeployed}</span>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-xs font-bold text-gray-700">
                    {t.required} <span className="text-red-600">{tier.price.toFixed(2)} USDT</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenPayment(tier.level, tier.price)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-xl font-bold shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.pay} {tier.price.toFixed(2)} USDT</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
