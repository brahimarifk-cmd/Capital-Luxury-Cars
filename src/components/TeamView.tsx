import React from 'react';
import { Copy, Share2 } from 'lucide-react';
import { Language, UserState } from '../types';
import { translations } from '../data/translations';

interface TeamViewProps {
  userState: UserState;
  language: Language;
  onCopyText: (text: string, label: string) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({ userState, language, onCopyText }) => {
  const t = translations[language];
  const referralLink = `${window.location.origin}/#/register?inv=${encodeURIComponent(userState.inviteCode)}`;

  return (
    <div className="space-y-4 pb-4">
      {/* Invitation Code Card */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-3xl p-5 shadow-lg">
        <p className="text-xs text-red-200 font-semibold">{t.yourInviteCode}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-mono font-black text-2xl tracking-widest text-white">
            {userState.inviteCode}
          </span>
          <button
            type="button"
            onClick={() => onCopyText(userState.inviteCode, language === 'ar' ? 'رمز الدعوة' : 'Invitation Code')}
            className="bg-white text-red-600 text-xs font-bold px-3.5 py-2 rounded-xl shadow transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{t.copyCode}</span>
          </button>
        </div>
        <p className="text-xs text-red-100 mt-3 leading-relaxed">{t.shareLinkDesc}</p>
        <div className="mt-3 flex items-center justify-between bg-black/25 p-2.5 rounded-2xl text-[11px] border border-white/10">
          <span className="truncate text-red-100 font-mono select-all mr-2">{referralLink}</span>
          <button
            type="button"
            onClick={() => onCopyText(referralLink, language === 'ar' ? 'رابط الإحالة' : 'Referral Link')}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shrink-0 transition active:scale-95 cursor-pointer flex items-center gap-1"
          >
            <Share2 className="w-3 h-3" />
            <span>{t.copyLink}</span>
          </button>
        </div>
      </div>

      {/* Team Overview Card */}
      <div className="bg-gray-900 text-white rounded-3xl p-5 shadow-sm border border-gray-800">
        <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
          {t.teamOverview}
        </h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-gray-400 text-[10px]">{t.teamSize}</p>
            <p className="font-black text-base mt-1 text-white">{userState.teamSize}</p>
            <span className="text-[9px] text-gray-500">{t.members}</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-gray-400 text-[10px]">{t.teamRecharge}</p>
            <p className="font-black text-base mt-1 text-emerald-400">${userState.teamRecharge.toFixed(2)}</p>
            <span className="text-[9px] text-gray-500">USDT</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-gray-400 text-[10px]">{t.teamWithdrawal}</p>
            <p className="font-black text-base mt-1 text-amber-400">${userState.teamWithdraw.toFixed(2)}</p>
            <span className="text-[9px] text-gray-500">USDT</span>
          </div>
        </div>
      </div>

      {/* Rebate Tiers */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-3.5 rounded-2xl shadow-sm text-center">
          <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-extrabold uppercase">
            LEVEL 1
          </span>
          <p className="text-[11px] mt-2 text-purple-200">{t.rebate}</p>
          <p className="font-black text-lg mt-0.5">10%</p>
        </div>
        <div className="bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-3.5 rounded-2xl shadow-sm text-center">
          <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-extrabold uppercase">
            LEVEL 2
          </span>
          <p className="text-[11px] mt-2 text-purple-200">{t.rebate}</p>
          <p className="font-black text-lg mt-0.5">3%</p>
        </div>
        <div className="bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-3.5 rounded-2xl shadow-sm text-center">
          <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-extrabold uppercase">
            LEVEL 3
          </span>
          <p className="text-[11px] mt-2 text-purple-200">{t.rebate}</p>
          <p className="font-black text-lg mt-0.5">1%</p>
        </div>
      </div>
    </div>
  );
};
