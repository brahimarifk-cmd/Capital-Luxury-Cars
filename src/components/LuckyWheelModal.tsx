import React, { useState } from 'react';
import { X, Sparkles, Trophy, Clock, Crown } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface LuckyWheelModalProps {
  remainingDraws: number;
  countdown?: string;
  language: Language;
  onClose: () => void;
  onSpin: (wonAmount: number) => void;
  onShare: () => void;
  onGoToVip?: () => void;
}

interface WheelSector {
  label: string;
  value: number;
  canWin: boolean;
}

const SECTORS: WheelSector[] = [
  { label: '0.50', value: 0.5, canWin: true },
  { label: '50.00', value: 50, canWin: false },
  { label: '0.10', value: 0.1, canWin: true },
  { label: '100.00', value: 100, canWin: false },
  { label: '1.50', value: 1.5, canWin: true },
  { label: '500.00', value: 500, canWin: false },
  { label: '0.50', value: 0.5, canWin: true },
  { label: '0.10', value: 0.1, canWin: true },
];

export const LuckyWheelModal: React.FC<LuckyWheelModalProps> = ({
  remainingDraws,
  countdown,
  language,
  onClose,
  onSpin,
  onShare,
  onGoToVip,
}) => {
  const t = translations[language];
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastWon, setLastWon] = useState<number | null>(null);

  const handleSpinClick = () => {
    if (remainingDraws <= 0 || spinning) return;

    setSpinning(true);
    setLastWon(null);

    // Strictly limit outcomes to only 0.10, 0.50, and 1.50 USDT
    const rand = Math.random();
    let chosenValue: number;
    if (rand < 0.50) {
      chosenValue = 0.10;
    } else if (rand < 0.85) {
      chosenValue = 0.50;
    } else {
      chosenValue = 1.50;
    }

    // Match sectors that have this exact value and are allowed to win
    const candidateIndices = SECTORS
      .map((s, idx) => (s.canWin && s.value === chosenValue ? idx : -1))
      .filter((idx) => idx !== -1);

    const targetSectorIndex =
      candidateIndices[Math.floor(Math.random() * candidateIndices.length)];

    const currentAngle = rotation % 360;
    const targetNormalized = (360 - (targetSectorIndex * 45 + 22.5)) % 360;
    let forwardAngle = targetNormalized - currentAngle;
    if (forwardAngle <= 0) {
      forwardAngle += 360;
    }

    // 5 full spins (1800 deg) plus the forward difference to the exact winning sector
    const spinRounds = 5 * 360;
    const nextRotation = rotation + spinRounds + forwardAngle;

    setRotation(nextRotation);

    setTimeout(() => {
      setSpinning(false);
      setLastWon(chosenValue);
      onSpin(chosenValue);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-sm text-center text-white my-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-bold text-red-200">
            {t.remainingTimes}: <span className="text-amber-300 font-extrabold text-sm">{remainingDraws}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 24h Refill Status Banner */}
        {remainingDraws <= 0 ? (
          <div className="bg-red-950/90 border border-red-500/40 text-red-100 px-3.5 py-2 rounded-2xl text-[11px] font-bold inline-flex items-center gap-2 shadow-inner mb-2 w-full justify-center">
            <Clock className="w-4 h-4 text-amber-300 shrink-0 animate-spin" />
            <span>
              {language === 'ar'
                ? `تتجدد المحاولة المجانية خلال: `
                : `Free spin refills in: `}
              <span className="font-mono text-amber-300 text-xs font-black">
                {countdown || '24:00:00'}
              </span>
            </span>
          </div>
        ) : (
          <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-100 px-3.5 py-1.5 rounded-2xl text-[11px] font-bold inline-flex items-center gap-1.5 shadow-inner mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {language === 'ar'
                ? 'لديك فرصة مجانية جاهزة للاستخدام الآن!'
                : '1 Free spin available to use now!'}
            </span>
          </div>
        )}

        {/* Wheel Graphic */}
        <div className="relative mx-auto w-64 h-64 my-2">
          <div
            className="w-full h-full rounded-full border-8 border-red-300 shadow-2xl relative transition-transform duration-[3000ms] ease-out overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              background:
                'conic-gradient(#fff1f2 0deg 45deg, #fecdd3 45deg 90deg, #fff1f2 90deg 135deg, #fecdd3 135deg 180deg, #fff1f2 180deg 225deg, #fecdd3 225deg 270deg, #fff1f2 270deg 315deg, #fecdd3 315deg 360deg)',
            }}
          >
            {SECTORS.map((sector, idx) => (
              <span
                key={idx}
                className="absolute left-1/2 top-1/2 text-[10px] font-black text-gray-800 pointer-events-none"
                style={{
                  transform: `translate(-50%, -50%) rotate(${idx * 45 + 22.5}deg) translateY(-85px) rotate(-${idx * 45 + 22.5}deg)`,
                }}
              >
                {sector.label}
                <small className="block text-[7px] font-bold text-red-600">USDT</small>
              </span>
            ))}
          </div>

          {/* Center Indicator needle */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-red-600 text-2xl z-10 drop-shadow">
            ▼
          </div>

          {/* Center Spin Button */}
          <button
            type="button"
            onClick={handleSpinClick}
            disabled={remainingDraws <= 0 || spinning}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-white text-white font-black text-xs shadow-xl flex flex-col items-center justify-center transition active:scale-95 cursor-pointer ${
              remainingDraws > 0 && !spinning
                ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                : 'bg-gray-600/90 opacity-80 cursor-not-allowed'
            }`}
          >
            {spinning ? (
              '...'
            ) : remainingDraws > 0 ? (
              <span className="text-sm font-black">{t.spin}</span>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 mb-0.5 text-amber-300" />
                <span className="text-[9px] leading-tight font-extrabold">{language === 'ar' ? '24 ساعة' : '24h'}</span>
              </>
            )}
          </button>
        </div>

        {lastWon !== null && !spinning && (
          <div className="mt-1 py-2 px-4 bg-amber-400 text-gray-950 rounded-xl font-black text-xs inline-flex items-center gap-1.5 shadow-lg border border-amber-300 animate-pulse">
            <Trophy className="w-4 h-4 text-red-600 shrink-0" />
            <span>
              {language === 'ar'
                ? `مبروك! لقد ربحت +${lastWon.toFixed(2)} USDT`
                : `Congrats! Won +${lastWon.toFixed(2)} USDT`}
            </span>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mt-3">
          <button
            type="button"
            onClick={onShare}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl py-2.5 text-xs font-bold shadow-lg transition active:scale-95 cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.share}</span>
          </button>
          {onGoToVip && (
            <button
              type="button"
              onClick={onGoToVip}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-gray-950 rounded-2xl py-2.5 text-xs font-black shadow-lg transition active:scale-95 cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-red-700" />
              <span>{language === 'ar' ? 'ترقية VIP' : 'Upgrade VIP'}</span>
            </button>
          )}
        </div>

        <div className="bg-white text-gray-800 rounded-3xl p-4 mt-3 text-xs shadow-xl border border-gray-100 text-start">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-red-600 font-extrabold text-xs">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{t.luckyDrawTitle}</span>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-red-500" />
              <span>{language === 'ar' ? 'تجدد كل 24 ساعة' : 'Refills every 24h'}</span>
            </span>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            {language === 'ar'
              ? 'تتجدد المحاولة المجانية تلقائياً كل 24 ساعة بعد الاستخدام! يمكنك أيضاً دعوة أصدقائك أو ترقية باقة VIP للحصول على فرص إضافية ومكافآت مستمرة.'
              : 'Free spin refills automatically every 24 hours after use! You can also invite friends or upgrade your VIP tier to win additional continuous rewards.'}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-2.5 text-red-600 font-bold text-xs hover:underline block cursor-pointer"
          >
            {t.continueToDash} →
          </button>
        </div>
      </div>
    </div>
  );
};
