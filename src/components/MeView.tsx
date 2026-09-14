import React from 'react';
import {
  UserCheck,
  Crown,
  Wallet,
  Coins,
  ArrowUpFromLine,
  FileText,
  LogOut,
  Copy,
  Sun,
  Gem,
  Zap,
  Code2,
} from 'lucide-react';
import { Language, UserState } from '../types';
import { translations } from '../data/translations';
import { CRYPTO_WALLETS } from '../data/mockData';

interface MeViewProps {
  userState: UserState;
  language: Language;
  onOpenWithdrawal: () => void;
  onOpenRecharge: () => void;
  onOpenRecords: () => void;
  onOpenHtmlCode?: () => void;
  onSignOut: () => void;
  onCopyText: (text: string, label: string) => void;
  onShowToast: (msg: string) => void;
}

export const MeView: React.FC<MeViewProps> = ({
  userState,
  language,
  onOpenWithdrawal,
  onOpenRecharge,
  onOpenRecords,
  onOpenHtmlCode,
  onSignOut,
  onCopyText,
  onShowToast,
}) => {
  const t = translations[language];

  const getWalletIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-4 h-4" />;
      case 'Gem':
        return <Gem className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Profile Info Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm truncate max-w-[180px]">
                {userState.userEmail}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 font-mono">ID: {userState.userId}</p>
            </div>
          </div>
          <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-xs border border-amber-200">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>{userState.vipLevel}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-gray-100 text-center">
          <div className="bg-gray-50/70 p-3 rounded-2xl border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">{t.totalBalance}</p>
            <p className="font-black text-xl text-gray-900 mt-1">
              {userState.balance.toFixed(2)}{' '}
              <span className="text-xs font-bold text-red-600">USDT</span>
            </p>
          </div>
          <div className="bg-gray-50/70 p-3 rounded-2xl border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">{language === 'ar' ? 'مبلغ الإيداع' : 'Recharge Amount'}</p>
            <p className="font-black text-xl text-gray-900 mt-1">
              {userState.rechargeAmount.toFixed(2)}{' '}
              <span className="text-xs font-bold text-gray-500">USDT</span>
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 text-center text-xs">
        <button
          type="button"
          onClick={() => onShowToast(language === 'ar' ? 'الحساب موثق وجاهز' : 'Account Details')}
          className="p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition active:scale-95 flex flex-col items-center"
        >
          <div className="text-blue-500 text-lg mb-1">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="text-gray-700 font-semibold text-[11px]">{t.account}</span>
        </button>

        <button
          type="button"
          onClick={onOpenRecharge}
          className="p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition active:scale-95 flex flex-col items-center"
        >
          <div className="text-red-500 text-lg mb-1">
            <Coins className="w-5 h-5" />
          </div>
          <span className="text-gray-700 font-semibold text-[11px]">{t.recharge}</span>
        </button>

        <button
          type="button"
          onClick={onOpenWithdrawal}
          className="p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition active:scale-95 flex flex-col items-center"
        >
          <div className="text-emerald-500 text-lg mb-1">
            <ArrowUpFromLine className="w-5 h-5" />
          </div>
          <span className="text-gray-700 font-semibold text-[11px]">{t.withdraw}</span>
        </button>

        <button
          type="button"
          onClick={onOpenRecords}
          className="p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition active:scale-95 flex flex-col items-center"
        >
          <div className="text-purple-500 text-lg mb-1">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-gray-700 font-semibold text-[11px]">{t.records}</span>
        </button>
      </div>

      {/* View Full HTML Code Card (Direct user request fulfillment) */}
      {onOpenHtmlCode && (
        <div className="bg-gradient-to-r from-gray-900 to-red-950 text-white p-4 rounded-3xl shadow-sm border border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">
                {language === 'ar' ? 'كود صفحة الموقع بصيغة HTML' : 'Website HTML Source Code'}
              </h4>
              <p className="text-[11px] text-gray-300">
                {language === 'ar' ? 'عرض ونسخ وتحميل ملف HTML المستقل' : 'View, copy, or download standalone HTML file'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenHtmlCode}
            className="bg-amber-400 hover:bg-amber-500 text-gray-950 text-xs font-bold px-3 py-2 rounded-xl transition active:scale-95 cursor-pointer shadow"
          >
            {language === 'ar' ? 'عرض الكود' : 'View Code'}
          </button>
        </div>
      )}

      {/* Payment Center (Deposit Addresses) */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-red-600" />
              <span>{t.paymentCenter}</span>
            </h4>
            <p className="text-[11px] text-gray-400 mt-0.5">{t.paymentCenterDesc}</p>
          </div>
          <span className="bg-red-50 text-red-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Crypto
          </span>
        </div>

        <div className="space-y-3">
          {CRYPTO_WALLETS.map((wallet) => (
            <div key={wallet.name} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                    {getWalletIcon(wallet.iconName)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-tight">{wallet.name}</p>
                    <span className="text-[10px] text-gray-400 font-semibold">{wallet.network}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <code className="min-w-0 flex-1 bg-white border border-gray-200 rounded-xl px-2.5 py-2 text-[10px] leading-4 text-gray-600 break-all select-all font-mono">
                  {wallet.address}
                </code>
                <button
                  type="button"
                  onClick={() => onCopyText(wallet.address, wallet.name)}
                  className="shrink-0 bg-gray-900 hover:bg-black text-white text-[10px] font-bold px-3 py-2 rounded-xl transition active:scale-95 cursor-pointer flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.copy}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          type="button"
          onClick={onSignOut}
          className="w-full p-4 flex items-center justify-between text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer transition active:scale-98"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-500" />
            <span>{t.signOut}</span>
          </div>
        </button>
      </div>
    </div>
  );
};
