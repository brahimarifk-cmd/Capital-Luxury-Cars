import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle, Crown } from 'lucide-react';
import { Language, UserState } from '../types';
import { translations } from '../data/translations';
import { MIN_WITHDRAWAL_AMOUNT } from '../data/mockData';

interface WithdrawalViewProps {
  userState: UserState;
  language: Language;
  onBack: () => void;
  onSubmitWithdrawal: (amount: number, address: string, method: string) => void;
  onUpgradeToVip1: () => void;
  onShowToast: (msg: string) => void;
}

export const WithdrawalView: React.FC<WithdrawalViewProps> = ({
  userState,
  language,
  onBack,
  onSubmitWithdrawal,
  onUpgradeToVip1,
  onShowToast,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const [selectedMethod, setSelectedMethod] = useState('BEP20-USDT');
  const [amountStr, setAmountStr] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showVipModal, setShowVipModal] = useState(false);

  const amount = Number.parseFloat(amountStr) || 0;
  const withdrawalFee = amount * 0.10;
  const actuallyReceived = Math.max(0, amount - withdrawalFee);
  const isVip0 = userState.vipLevel === 'VIP0';

  const withdrawalMethods = [
    { name: 'BEP20-USDT', note: 'BSC' },
    { name: 'TRC20-USDT', note: 'TRON' },
    { name: 'TRX', note: 'TRON' },
    { name: 'USDT (Polygon)', note: 'POLYGON' },
    { name: 'ETH-USDT', note: 'ERC20' },
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    // RULE 1: User must upgrade to VIP1
    if (isVip0) {
      setShowVipModal(true);
      onShowToast(
        language === 'ar'
          ? 'يجب ترقية الحساب إلى VIP1 للتمكن من السحب!'
          : 'You must upgrade the account to VIP1 to withdraw!'
      );
      return;
    }

    // RULE 2: Minimum withdrawal is 10 USDT
    const numAmount = Number.parseFloat(amountStr);
    if (!Number.isFinite(numAmount) || numAmount < MIN_WITHDRAWAL_AMOUNT) {
      onShowToast(
        language === 'ar'
          ? `الحد الأدنى للسحب هو ${MIN_WITHDRAWAL_AMOUNT} USDT`
          : `Minimum withdrawal is ${MIN_WITHDRAWAL_AMOUNT}.00 USDT`
      );
      return;
    }

    // Balance check
    if (numAmount > userState.balance) {
      onShowToast(
        language === 'ar'
          ? 'المبلغ يتجاوز رصيدك الحالي المتاح!'
          : 'Amount exceeds your available balance!'
      );
      return;
    }

    // Address check
    if (!address.trim()) {
      onShowToast(
        language === 'ar'
          ? 'يرجى إدخال عنوان محفظة السحب!'
          : 'Please enter your withdrawal wallet address!'
      );
      return;
    }

    // Password check
    if (!password.trim()) {
      onShowToast(
        language === 'ar'
          ? 'يرجى إدخال كلمة المرور للتأكيد!'
          : 'Please enter your password to confirm!'
      );
      return;
    }

    onSubmitWithdrawal(numAmount, address, selectedMethod);
    setAmountStr('');
    setAddress('');
    setPassword('');
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Top Bar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-2xl bg-white border border-gray-200 text-gray-700 flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95 transition cursor-pointer"
        >
          <BackIcon className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-bold text-gray-900 text-base">{t.withdraw}</h3>
          <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
            <span>مهلة المعالجة: خلال 24 ساعة</span>
          </p>
        </div>
      </div>

      {/* VIP1 Upgrade Mandatory Warning Banner (for VIP0) */}
      {isVip0 ? (
        <div className="bg-amber-50 border-2 border-amber-400/80 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow">
              <Crown className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-amber-900 text-sm">
                  {language === 'ar' ? 'تنبيه: الترقية إلى VIP1 إلزامية للسحب' : 'Notice: Upgrade to VIP1 Required'}
                </h4>
              </div>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                {language === 'ar'
                  ? 'السحب غير متاح لحسابات VIP0 التجريبية. يجب ترقية حسابك إلى باقة VIP1 لتفعيل إمكانية سحب الأرباح إلى محفظتك.'
                  : 'Withdrawals are locked for VIP0 accounts. You must upgrade to VIP1 to enable withdrawals.'}
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={onUpgradeToVip1}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Crown className="w-4 h-4" />
                  <span>{language === 'ar' ? 'الترقية إلى VIP1 الآن (15 USDT)' : 'Upgrade to VIP1 (15 USDT)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-900">
              {language === 'ar' ? `حسابك مفعل (${userState.vipLevel}) - السحب متاح` : `Active Account (${userState.vipLevel}) - Withdrawals Enabled`}
            </p>
            <p className="text-[10px] text-emerald-700">
              {language === 'ar' ? 'يمكنك سحب أرباحك مباشرة إلى محفظتك الرقمية' : 'You can withdraw funds directly to your wallet'}
            </p>
          </div>
        </div>
      )}

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-gray-900 text-sm">{t.withdrawalAccount}</h4>
          <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            SSL 256-Bit Encrypted
          </span>
        </div>

        {/* Total Balance Display */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 mb-4">
          <p className="text-xs text-gray-500 font-medium">{t.totalBalance}</p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-2xl font-black text-gray-900">{userState.balance.toFixed(2)}</span>
            <span className="text-xs font-bold text-red-600">USDT</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            {language === 'ar' ? 'المستوى الحالي:' : 'Current Level:'}{' '}
            <span className="font-bold text-gray-700">{userState.vipLevel}</span>
          </p>
        </div>

        {/* 24-Hour Processing Notice */}
        <div className="flex items-center gap-2 p-2.5 bg-red-50/80 border border-red-100 rounded-2xl text-xs text-red-800 mb-4">
          <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
          <span className="font-medium">
            {language === 'ar'
              ? 'مدة معالجة وصرف طلب السحب خلال 24 ساعة كحد أقصى.'
              : 'Withdrawal processing period is within 24 hours.'}
          </span>
        </div>

        <form onSubmit={handleConfirm} className="space-y-4">
          {/* Withdrawal Method Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">{t.withdrawalMethod}</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {withdrawalMethods.map((method) => {
                const isSelected = selectedMethod === method.name;
                return (
                  <button
                    key={method.name}
                    type="button"
                    onClick={() => setSelectedMethod(method.name)}
                    className={`text-start px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      isSelected
                        ? 'bg-gray-900 text-white border-gray-900 shadow'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="truncate">{method.name}</div>
                    <div className={`text-[9px] ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                      {method.note}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount Input with 10 USDT Minimum indicator */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="withdrawal-amount-input" className="text-xs font-bold text-gray-700">
                {language === 'ar' ? 'مبلغ السحب (USDT)' : 'Withdrawal Amount (USDT)'}
              </label>
              <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                {language === 'ar' ? 'الحد الأدنى: 10 USDT' : 'Min: 10.00 USDT'}
              </span>
            </div>
            <div className="relative">
              <input
                id="withdrawal-amount-input"
                type="number"
                step="0.01"
                min="10"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? `المبلغ (10.00 - ${userState.balance.toFixed(2)} USDT)`
                    : `Amount (10.00 - ${userState.balance.toFixed(2)} USDT)`
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-16 pr-4 py-3.5 text-sm text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition font-medium"
              />
              <button
                type="button"
                onClick={() => setAmountStr(userState.balance.toFixed(2))}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-red-600 hover:text-red-700 px-2.5 py-1 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'الكل' : 'MAX'}
              </button>
            </div>
            {/* Quick Helper Text */}
            <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-500" />
              <span>
                {language === 'ar'
                  ? 'الحد الأدنى المسموح به للسحب هو 10 USDT'
                  : 'The minimum allowed withdrawal is 10 USDT'}
              </span>
            </p>
          </div>

          {/* Wallet Address Input */}
          <div>
            <label htmlFor="withdrawal-address-input" className="block text-xs font-bold text-gray-700 mb-1.5">
              {language === 'ar' ? 'عنوان محفظة الاستلام' : 'Withdrawal Wallet Address'}
            </label>
            <input
              id="withdrawal-address-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل عنوان المحفظة (USDT)' : 'Enter wallet address'}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition font-mono"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="withdrawal-password-input" className="block text-xs font-bold text-gray-700 mb-1.5">
              {language === 'ar' ? 'كلمة مرور المعاملات / الحساب' : 'Security / Login Password'}
            </label>
            <input
              id="withdrawal-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
            />
          </div>

          {/* Fee & Calculation Preview */}
          <div className="bg-gray-50 rounded-2xl p-3 text-xs space-y-1.5 border border-gray-100">
            <div className="flex justify-between text-gray-500">
              <span>{t.fee10}:</span>
              <span className="font-semibold text-gray-700">-{withdrawalFee.toFixed(2)} USDT</span>
            </div>
            <div className="flex justify-between items-center pt-1.5 border-t border-gray-200 font-bold text-gray-900">
              <span>{t.actuallyReceived}:</span>
              <span className="text-emerald-600 text-sm">{actuallyReceived.toFixed(2)} USDT</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-3.5 rounded-2xl shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{t.confirmWithdrawal}</span>
          </button>
        </form>
      </div>

      {/* Modal: VIP1 Required Alert */}
      {showVipModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-center shadow-2xl animate-scale-up border border-red-100">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3.5 shadow-inner">
              <Crown className="w-7 h-7" />
            </div>
            <h3 className="font-black text-gray-900 text-lg">
              {language === 'ar' ? 'مطلوب الترقية إلى VIP1 للسحب' : 'VIP1 Upgrade Required'}
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {language === 'ar'
                ? 'السحب غير متاح لحسابات VIP0 التجريبية. يجب ترقية حسابك إلى باقة VIP1 لتتمكن من سحب أموالك بنجاح!'
                : 'Withdrawals are not permitted on tier VIP0. You must upgrade your account to VIP1 before you can withdraw your funds!'}
            </p>

            <div className="bg-gray-50 rounded-2xl p-3 my-4 border border-gray-100 text-start text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'ar' ? 'المستوى الحالي:' : 'Current Level:'}</span>
                <span className="font-bold text-gray-800">{userState.vipLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'ar' ? 'المستوى المطلوب:' : 'Required Level:'}</span>
                <span className="font-bold text-red-600">VIP1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'ar' ? 'سعر الترقية:' : 'Upgrade Price:'}</span>
                <span className="font-bold text-gray-800">15.00 USDT</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowVipModal(false);
                  onUpgradeToVip1();
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 rounded-xl shadow transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                <span>{language === 'ar' ? 'الترقية إلى VIP1 الآن' : 'Upgrade to VIP1 Now'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowVipModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
