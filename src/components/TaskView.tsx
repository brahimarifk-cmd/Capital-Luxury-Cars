import React, { useState } from 'react';
import { CheckCircle2, FolderOpen, Car, Clock, Sparkles } from 'lucide-react';
import { Language, UserState } from '../types';
import { translations } from '../data/translations';

interface TaskViewProps {
  userState: UserState;
  language: Language;
  formattedCountdown: string;
  isTaskAvailable: boolean;
  onCompleteTask: () => void;
}

export const TaskView: React.FC<TaskViewProps> = ({
  userState,
  language,
  formattedCountdown,
  isTaskAvailable,
  onCompleteTask,
}) => {
  const t = translations[language];
  const [subTab, setSubTab] = useState<'in-progress' | 'completed'>('in-progress');

  const remainingCount = isTaskAvailable ? 1 : 0;
  const completedCount = isTaskAvailable ? 0 : 1;

  return (
    <div className="space-y-4 pb-4">
      {/* Task Countdown Card */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-3xl p-5 text-center shadow-lg">
        <div className="flex items-center justify-center gap-1.5 text-xs text-red-200 font-semibold uppercase tracking-wider mb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{t.dailyReset}</span>
        </div>
        <div className="text-3xl font-black font-mono tracking-widest mt-1 text-white">
          {formattedCountdown}
        </div>
        <div className="flex justify-around mt-4 pt-3 border-t border-red-500/40 text-xs">
          <div>
            <p className="text-red-200">{language === 'ar' ? 'المهام المعينة' : 'Total Assigned'}</p>
            <p className="font-extrabold text-lg mt-0.5 text-white">{userState.maxDailyTasks}</p>
          </div>
          <div>
            <p className="text-red-200">{language === 'ar' ? 'المتبقي اليوم' : 'Remaining'}</p>
            <p className="font-extrabold text-lg mt-0.5 text-amber-300">{remainingCount}</p>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 text-xs font-bold">
        <button
          type="button"
          onClick={() => setSubTab('in-progress')}
          className={`flex-1 py-2.5 rounded-xl text-center transition cursor-pointer ${
            subTab === 'in-progress'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          {t.inProgress} ({remainingCount})
        </button>
        <button
          type="button"
          onClick={() => setSubTab('completed')}
          className={`flex-1 py-2.5 rounded-xl text-center transition cursor-pointer ${
            subTab === 'completed'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          {t.completed} ({completedCount})
        </button>
      </div>

      {/* Dynamic Task List */}
      {subTab === 'in-progress' ? (
        remainingCount > 0 ? (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 bg-red-50 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 border border-red-100">
                <img
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=200&q=80"
                  alt="Toyota Supra"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-md">
                  {userState.vipLevel} Order
                </span>
                <h4 className="font-bold text-gray-900 text-sm mt-1 truncate">
                  Toyota GR Supra Fleet Lease
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t.commission}{' '}
                  <span className="text-emerald-600 font-extrabold">+1.50 USDT</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onCompleteTask}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-3.5 rounded-2xl font-bold shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.submitTask}</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[220px]">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-sm text-gray-800 font-extrabold">{t.allTasksCompleted}</p>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">{t.tasksCooldownDesc}</p>
          </div>
        )
      ) : completedCount > 0 ? (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <span className="font-bold text-gray-800">Toyota GR Supra Lease</span>
            </div>
            <span className="text-emerald-600 font-extrabold">+1.50 USDT</span>
          </div>
          <p className="text-[11px] text-gray-400 text-end">
            {language === 'ar' ? 'تمت المعالجة بنجاح اليوم' : 'Completed successfully today'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[220px]">
          <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center text-2xl mb-3">
            <FolderOpen className="w-7 h-7 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 font-semibold">
            {language === 'ar' ? 'لا توجد مهام مكتملة بعد اليوم' : 'No completed tasks yet today'}
          </p>
        </div>
      )}
    </div>
  );
};
