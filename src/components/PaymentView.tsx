import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy, Clock, ShieldCheck, CheckCircle2, AlertTriangle, Crown } from 'lucide-react';
import { Language, PaymentRequest } from '../types';
import { translations } from '../data/translations';
import { CRYPTO_WALLETS } from '../data/mockData';

interface PaymentViewProps {
  payment: PaymentRequest;
  language: Language;
  onBack: () => void;
  onConfirmPayment: (payment: PaymentRequest, txId: string) => void;
  onCopyText: (text: string, label: string) => void;
  onShowToast: (msg: string) => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  payment,
  language,
  onBack,
  onConfirmPayment,
  onCopyText,
  onShowToast,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const [selectedWallet, setSelectedWallet] = useState(CRYPTO_WALLETS[2]); // Default to TRC20
  const [txId, setTxId] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId.trim()) {
      onShowToast(
        language === 'ar'
          ? 'يرجى إدخال معرف المعاملة (TxID / Hash)'
          : 'Please enter transaction hash (TxID)'
      );
      return;
    }

    onConfirmPayment(payment, txId.trim());
    setShowSuccessModal(true);
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-2xl bg-white border border-gray-200 text-gray-700 flex items-center justify-center shadow-sm hover:bg-gray-50 active:scale-95 transition cursor-pointer"
        >
          <BackIcon className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-bold text-gray-900 text-base">
            {language === 'ar' ? 'مركز الدفع والترقية' : 'Payment & Upgrade Center'}
          </h3>
          <p className="text-[11px] text-gray-500">
            {language === 'ar' ? 'مهلة تأكيد المعاملة: 24 ساعة' : 'Payment Confirmation Period: 24h'}
          </p>
        </div>
      </div>

      {/* Selected Upgrade Order Card */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-850 to-red-950 text-white rounded-3xl p-5 shadow-lg border border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-red-300 font-bold uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full">
              {payment.type === 'upgrade'
                ? language === 'ar' ? 'طلب ترقية باقة' : 'Account Upgrade Order'
                : language === 'ar' ? 'طلب شحن محفظة' : 'Recharge Order'}
            </span>
            <h4 className="text-lg font-black mt-1.5 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span>{payment.level}</span>
            </h4>
          </div>
          <div className="text-end">
            <span className="text-xs text-gray-300 block">{language === 'ar' ? 'المبلغ المستحق' : 'Amount Due'}</span>
            <span className="text-2xl font-black text-amber-300 font-mono">
              {payment.cost.toFixed(2)} <span className="text-xs text-white">USDT</span>
            </span>
          </div>
        </div>

        {/* 24-Hour Processing Badge */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-amber-200 bg-white/5 p-2.5 rounded-2xl border border-white/5">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="leading-tight">
            {language === 'ar'
              ? 'مدة تأكيد ومراجعة الدفع: خلال 24 ساعة من تاريخ التحويل.'
              : 'Payment confirmation period: Within 24 hours from transfer submission.'}
          </span>
        </div>
      </div>

      {/* Select Network */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-800 mb-2">
            {language === 'ar' ? 'اختر شبكة التحويل (USDT):' : 'Select Payment Network (USDT):'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CRYPTO_WALLETS.map((wallet) => {
              const isSelected = selectedWallet.name === wallet.name;
              return (
                <button
                  key={wallet.name}
                  type="button"
                  onClick={() => setSelectedWallet(wallet)}
                  className={`p-2.5 rounded-2xl border text-center transition cursor-pointer ${
                    isSelected
                      ? 'bg-red-50 border-red-500 text-red-700 shadow-xs ring-1 ring-red-400 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300 font-medium'
                  }`}
                >
                  <p className="text-xs truncate">{wallet.network}</p>
                  <p className="text-[9px] text-gray-400 truncate mt-0.5">{wallet.name.split('/')[0]}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wallet Address & Copy */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-gray-700">
              {language === 'ar' ? 'عنوان الإيداع المعتمد:' : 'Deposit Address:'}
            </span>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
              {selectedWallet.network}
            </span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2">
            <code className="flex-1 font-mono text-[11px] text-gray-800 break-all select-all leading-snug">
              {selectedWallet.address}
            </code>
            <button
              type="button"
              onClick={() => onCopyText(selectedWallet.address, selectedWallet.network)}
              className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-xl transition active:scale-95 shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{t.copy}</span>
            </button>
          </div>
          <p className="text-[11px] text-amber-700 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              {language === 'ar'
                ? 'يرجى إرسال عملة USDT عبر الشبكة المختارة حصراً لتجنب فقدان الأموال.'
                : 'Send only USDT through this specified network.'}
            </span>
          </p>
        </div>

        {/* Submit Proof of Payment */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="payment-txid-input" className="block text-xs font-bold text-gray-700 mb-1.5">
              {language === 'ar' ? 'رمز المعاملة من محفظتك (TxID / Hash):' : 'Transaction Hash (TxID):'}
            </label>
            <input
              id="payment-txid-input"
              type="text"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              placeholder="e.g. 8f4e72a19b840c6d..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 font-mono transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3.5 rounded-2xl shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {language === 'ar'
                ? `تأكيد الدفع (مهلة المراجعة 24 ساعة)`
                : `Confirm Payment (24h Review Period)`}
            </span>
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-center shadow-2xl border border-emerald-100">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-black text-gray-900 text-base">
              {language === 'ar' ? 'تم استلام بيانات التحويل بنجاح' : 'Payment Submitted Successfully'}
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {language === 'ar'
                ? 'مهلة تأكيد الإيداع هي 24 ساعة. سيتم التحقق من المعاملة عبر البلوكتشين وتفعيل باقة ' + payment.level + ' تلقائياً.'
                : 'The payment confirmation period is 24 hours. The transaction will be verified on the blockchain and ' + payment.level + ' will be activated.'}
            </p>

            <div className="bg-gray-50 rounded-2xl p-3 my-3 text-xs border border-gray-100 text-start space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'ar' ? 'المبلغ:' : 'Amount:'}</span>
                <span className="font-bold text-gray-900">{payment.cost.toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'ar' ? 'المدة القصوى:' : 'Period:'}</span>
                <span className="font-bold text-red-600">24 {language === 'ar' ? 'ساعة' : 'Hours'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{language === 'ar' ? 'الحالة:' : 'Status:'}</span>
                <span className="font-bold text-amber-600">
                  {language === 'ar' ? 'قيد المراجعة (24 ساعة)' : 'Pending (24h)'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                onBack();
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 rounded-xl shadow transition cursor-pointer"
            >
              {language === 'ar' ? 'حسناً، فهمت' : 'OK, Got It'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
