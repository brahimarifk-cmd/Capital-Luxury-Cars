import React from 'react';
import { X, FileText, ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { Language, TransactionRecord } from '../types';
import { translations } from '../data/translations';

interface RecordsModalProps {
  records: TransactionRecord[];
  language: Language;
  onClose: () => void;
}

export const RecordsModal: React.FC<RecordsModalProps> = ({ records, language, onClose }) => {
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">{t.financialRecords}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 py-3 space-y-2.5">
          {records.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs">
              {language === 'ar' ? 'لا توجد سجلات مالية سابقة' : 'No financial records found'}
            </div>
          ) : (
            records.map((rec) => {
              const isPositive = rec.amount >= 0;
              return (
                <div
                  key={rec.id}
                  className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {isPositive ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 leading-tight">{rec.type}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">{rec.date}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p
                      className={`font-black text-xs ${
                        isPositive ? 'text-emerald-600' : 'text-gray-900'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {rec.amount.toFixed(2)} USDT
                    </p>
                    <span
                      className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-md mt-0.5 ${
                        rec.status === 'Success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1'
                      }`}
                    >
                      {rec.status === 'Success' ? (
                        rec.status
                      ) : (
                        <>
                          <Clock className="w-2.5 h-2.5 text-amber-600" />
                          <span>
                            {rec.status === 'Pending (24h)'
                              ? language === 'ar' ? 'قيد المراجعة (24 ساعة)' : 'Pending (24h)'
                              : rec.status}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
