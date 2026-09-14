import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { TaskView } from './components/TaskView';
import { TeamView } from './components/TeamView';
import { VipView } from './components/VipView';
import { MeView } from './components/MeView';
import { WithdrawalView } from './components/WithdrawalView';
import { PaymentView } from './components/PaymentView';
import { AuthModal } from './components/AuthModal';
import { LuckyWheelModal } from './components/LuckyWheelModal';
import { RecordsModal } from './components/RecordsModal';
import { WelcomePromoModal } from './components/WelcomePromoModal';
import { HtmlCodeModal } from './components/HtmlCodeModal';
import { TabType, Language, UserState, LivePayout, TransactionRecord, PaymentRequest } from './types';
import { INITIAL_PAYOUTS, MIN_WITHDRAWAL_AMOUNT } from './data/mockData';
import { Clock } from 'lucide-react';
import { updateUserStateInStorage } from './services/authService';

const TASK_RESET_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const LUCKY_DRAW_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_KEY = 'clc_app_user_state_v4';
const LANG_STORAGE_KEY = 'clc_app_language';

const sampleNames = ['alex', 'sarah', 'michael', 'jessica', 'david', 'robert', 'emily', 'james', 'chris', 'amanda', 'tariq', 'omar', 'salem', 'fatima'];
const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
const vipOptions = ['VIP1', 'VIP2', 'VIP3', 'VIP4', 'VIP5', 'VIP6'];

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      return saved === 'en' || saved === 'ar' ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [showWithdrawal, setShowWithdrawal] = useState<boolean>(false);
  const [pendingPayment, setPendingPayment] = useState<PaymentRequest | null>(null);
  const [showLuckyWheel, setShowLuckyWheel] = useState<boolean>(false);
  const [showWelcomePromo, setShowWelcomePromo] = useState<boolean>(false);
  const [showRecords, setShowRecords] = useState<boolean>(false);
  const [showHtmlModal, setShowHtmlModal] = useState<boolean>(false);

  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
  }, []);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  // Initial user state
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          balance: parsed.balance ?? 15.50,
          rechargeAmount: parsed.rechargeAmount ?? 0.0,
          luckyDrawLastUsedAt: parsed.luckyDrawLastUsedAt ?? null,
        };
      }
    } catch {}

    return {
      isAuthenticated: true,
      currentUser: 'demo_user@luxurycars.vip',
      userId: '7492105',
      userEmail: 'demo_user@luxurycars.vip',
      authMethod: 'email',
      balance: 15.50,
      rechargeAmount: 0.0,
      vipLevel: 'VIP0', // Starts at VIP0
      taskCompletedAt: null,
      maxDailyTasks: 1,
      teamSize: 4,
      teamRecharge: 0.0,
      teamWithdraw: 0.0,
      inviteCode: 'CLC749210',
      luckyDrawRemaining: 1,
      luckyDrawLastUsedAt: null,
      records: [],
    };
  });

  // Save user state to localStorage and user database
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
      if (userState.currentUser) {
        updateUserStateInStorage(userState.currentUser, userState);
      }
    } catch {}
  }, [userState]);

  // Handle document direction and language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch {}
  }, [language]);

  // Countdown timer calculations
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Automatic Refill Lucky Wheel every 24 hours after use
  useEffect(() => {
    if (
      userState.luckyDrawRemaining <= 0 &&
      userState.luckyDrawLastUsedAt &&
      now >= userState.luckyDrawLastUsedAt + LUCKY_DRAW_COOLDOWN
    ) {
      setUserState((prev) => ({
        ...prev,
        luckyDrawRemaining: 1,
        luckyDrawLastUsedAt: null,
      }));
    }
  }, [now, userState.luckyDrawRemaining, userState.luckyDrawLastUsedAt]);

  const remainingLuckyDrawMs =
    userState.luckyDrawRemaining <= 0 && userState.luckyDrawLastUsedAt
      ? Math.max(0, userState.luckyDrawLastUsedAt + LUCKY_DRAW_COOLDOWN - now)
      : 0;

  const isTaskAvailable =
    !userState.taskCompletedAt || now >= userState.taskCompletedAt + TASK_RESET_DURATION;

  const remainingTaskMs = userState.taskCompletedAt
    ? Math.max(0, userState.taskCompletedAt + TASK_RESET_DURATION - now)
    : 0;

  const formatCountdown = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const formattedCountdown = formatCountdown(remainingTaskMs);
  const formattedLuckyDrawCountdown = formatCountdown(remainingLuckyDrawMs);

  // Live Payouts Ticker
  const [livePayouts, setLivePayouts] = useState<LivePayout[]>(INITIAL_PAYOUTS);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomVip = vipOptions[Math.floor(Math.random() * vipOptions.length)];
      let userIdent = '';
      if (Math.random() > 0.5) {
        const digits = Math.floor(1000000 + Math.random() * 9000000);
        userIdent = `+${['971', '966', '44', '1'][Math.floor(Math.random() * 4)]}******${String(digits).slice(-4)}`;
      } else {
        const name = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        const dom = emailDomains[Math.floor(Math.random() * emailDomains.length)];
        userIdent = `${name.slice(0, 3)}***@${dom}`;
      }

      let amount = 15 + Math.random() * 80;
      if (randomVip === 'VIP3' || randomVip === 'VIP4') amount = 200 + Math.random() * 500;
      if (randomVip === 'VIP5' || randomVip === 'VIP6') amount = 1000 + Math.random() * 3000;

      const newPayout: LivePayout = {
        id: Date.now(),
        user: userIdent,
        vip: randomVip,
        amount: Math.round(amount * 100) / 100,
      };

      setLivePayouts((prev) => [newPayout, ...prev.slice(0, 4)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Actions
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleOpenSupport = () => {
    showToast(
      language === 'ar'
        ? 'خدمة العملاء متصلة 24/7. جاري تحويلك للمستشار المالي...'
        : 'Customer support online 24/7. Connecting to advisor...'
    );
  };

  const handleShowCompanyInfo = () => {
    showToast(
      language === 'ar'
        ? 'شركة Capital Luxury Cars المحدودة. مسجلة برقم ترخيص #CL982341.'
        : 'Capital Luxury Cars Ltd. London, UK. License #CL982341.'
    );
  };

  const handleCopyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(language === 'ar' ? `تم نسخ ${label} بنجاح!` : `${label} copied!`);
    } catch {
      showToast(language === 'ar' ? 'فشل النسخ' : 'Copy failed');
    }
  };

  const handleCompleteTask = () => {
    if (!isTaskAvailable) {
      showToast(
        language === 'ar' ? 'المهمة قيد التجديد لليوم!' : 'Task is in cooldown for today!'
      );
      return;
    }

    const commission = 1.5;
    const record: TransactionRecord = {
      id: String(Date.now()),
      type: 'مهمة تأجير تويوتا سوبرا',
      amount: commission,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Success',
    };

    setUserState((prev) => ({
      ...prev,
      balance: Math.round((prev.balance + commission) * 100) / 100,
      taskCompletedAt: Date.now(),
      records: [record, ...prev.records],
    }));

    showToast(
      language === 'ar'
        ? 'تهانينا! تم إنجاز المهمة وإضافة +1.50 USDT إلى رصيدك!'
        : 'Earned +1.50 USDT commission!'
    );
  };

  // Open Payment Screen
  const handleOpenPayment = (level: string, cost: number, type: 'upgrade' | 'recharge' = 'upgrade') => {
    setPendingPayment({ level, cost, type });
    setShowWithdrawal(false);
  };

  // Confirm Payment with 24 Hours period
  const handleConfirmPayment = (payment: PaymentRequest, txId: string) => {
    const newRecord: TransactionRecord = {
      id: String(Date.now()),
      type: payment.type === 'upgrade' ? `ترقية إلى (${payment.level})` : 'شحن رصيد',
      amount: payment.cost,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending (24h)',
      note: `TxID: ${txId.slice(0, 10)}... (المهلة 24 ساعة)`,
    };

    setUserState((prev) => ({
      ...prev,
      records: [newRecord, ...prev.records],
    }));

    showToast(
      language === 'ar'
        ? `تم استلام المعاملة! مهلة المراجعة والتأكيد 24 ساعة لتفعيل ${payment.level}.`
        : `Payment submitted! Confirmation period is 24 hours to activate ${payment.level}.`
    );

    setPendingPayment(null);
  };

  // Handle Withdrawal Submission with 24 Hours Period and 10 USDT minimum
  const handleSubmitWithdrawal = (amount: number, address: string, method: string) => {
    // 1. VIP1 requirement check
    if (userState.vipLevel === 'VIP0') {
      showToast(
        language === 'ar'
          ? 'يجب ترقية الحساب إلى VIP1 للتمكن من السحب!'
          : 'You must upgrade account to VIP1 to withdraw!'
      );
      handleOpenPayment('VIP1', 15.0, 'upgrade');
      return;
    }

    // 2. Minimum 10 USDT check
    if (amount < MIN_WITHDRAWAL_AMOUNT) {
      showToast(
        language === 'ar'
          ? `الحد الأدنى للسحب هو ${MIN_WITHDRAWAL_AMOUNT} USDT`
          : `Minimum withdrawal is ${MIN_WITHDRAWAL_AMOUNT}.00 USDT`
      );
      return;
    }

    // Balance check
    if (amount > userState.balance) {
      showToast(
        language === 'ar' ? 'المبلغ يتجاوز الرصيد المتاح!' : 'Amount exceeds available balance!'
      );
      return;
    }

    // 3. 24 Hours Withdrawal Period
    const newRecord: TransactionRecord = {
      id: String(Date.now()),
      type: `طلب سحب (${method})`,
      amount: -amount,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending (24h)',
      note: `Address: ${address.slice(0, 8)}... (المهلة 24 ساعة)`,
    };

    setUserState((prev) => ({
      ...prev,
      balance: Math.round((prev.balance - amount) * 100) / 100,
      records: [newRecord, ...prev.records],
    }));

    showToast(
      language === 'ar'
        ? 'تم تقديم طلب السحب بنجاح! مهلة المعالجة والتحويل خلال 24 ساعة.'
        : 'Withdrawal request submitted! Processing and payout period is 24 hours.'
    );

    setShowWithdrawal(false);
    setCurrentTab('me');
  };

  const handleSpinLuckyWheel = (wonAmount: number) => {
    const spinTime = Date.now();
    setUserState((prev) => ({
      ...prev,
      luckyDrawRemaining: Math.max(0, prev.luckyDrawRemaining - 1),
      luckyDrawLastUsedAt: spinTime,
      balance: Math.round((prev.balance + wonAmount) * 100) / 100,
      records: [
        {
          id: String(Date.now()),
          type: 'جائزة عجلة الحظ',
          amount: wonAmount,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'Success',
        },
        ...prev.records,
      ],
    }));

    showToast(
      language === 'ar'
        ? `مبروك! لقد ربحت +${wonAmount.toFixed(2)} USDT تمت إضافتها لرصيدك!`
        : `Won +${wonAmount.toFixed(2)} USDT from Lucky Draw!`
    );
  };

  const handleProceedFromPromoToWheel = () => {
    setShowWelcomePromo(false);
    setShowLuckyWheel(true);
  };

  const handleClosePromo = () => {
    setShowWelcomePromo(false);
    setShowLuckyWheel(true);
  };

  const handleGoToVipFromPromo = () => {
    setShowWelcomePromo(false);
    setCurrentTab('vip');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    setUserState((prev) => ({
      ...prev,
      isAuthenticated: false,
    }));
    showToast(language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Signed out successfully');
  };

  const handleLoginSuccess = (
    identifier: string,
    method: 'email' | 'phone',
    restoredState?: UserState
  ) => {
    if (restoredState) {
      setUserState({
        ...restoredState,
        isAuthenticated: true,
        currentUser: identifier,
        userEmail: identifier,
        authMethod: method,
      });
    } else {
      setUserState((prev) => ({
        ...prev,
        isAuthenticated: true,
        currentUser: identifier,
        userEmail: identifier,
        authMethod: method,
      }));
    }
    setCurrentTab('home');
    setShowWelcomePromo(true);
  };

  // If user is logged out, show auth view
  if (!userState.isAuthenticated) {
    return (
      <div className="font-sans antialiased text-gray-800 flex justify-center min-h-screen bg-gray-100">
        <AuthModal
          language={language}
          onLoginSuccess={handleLoginSuccess}
          onShowToast={showToast}
        />
        {toast.visible && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs z-50 font-bold border border-white/10 animate-bounce">
            {toast.message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-800 flex justify-center min-h-screen bg-gray-100 select-none">
      <div className="w-full max-w-md bg-[#fcfbfb] min-h-screen flex flex-col relative shadow-2xl pb-24">
        {/* Top Header with HTML Code preview button */}
        <Header
          language={language}
          onToggleLanguage={handleToggleLanguage}
          onOpenSupport={handleOpenSupport}
          onOpenHtmlCode={() => setShowHtmlModal(true)}
        />

        {/* 24-Hour Policy Notice Indicator */}
        <div className="bg-gray-900 text-amber-300 px-4 py-2 text-[11px] font-semibold flex items-center justify-between border-b border-gray-800">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'ar' ? 'مهلة السحب والدفع: 24 ساعة' : 'Withdrawal & Payment Period: 24 Hours'}</span>
          </span>
          <span className="text-gray-400 font-mono text-[10px]">
            {language === 'ar' ? 'الحد الأدنى: 10 USDT' : 'Min: 10 USDT'}
          </span>
        </div>

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 overflow-y-auto px-4 py-4">
          {pendingPayment ? (
            <PaymentView
              payment={pendingPayment}
              language={language}
              onBack={() => setPendingPayment(null)}
              onConfirmPayment={handleConfirmPayment}
              onCopyText={handleCopyText}
              onShowToast={showToast}
            />
          ) : showWithdrawal ? (
            <WithdrawalView
              userState={userState}
              language={language}
              onBack={() => setShowWithdrawal(false)}
              onSubmitWithdrawal={handleSubmitWithdrawal}
              onUpgradeToVip1={() => handleOpenPayment('VIP1', 15.0, 'upgrade')}
              onShowToast={showToast}
            />
          ) : currentTab === 'home' ? (
            <HomeView
              userState={userState}
              language={language}
              onOpenLuckyWheel={() => setShowLuckyWheel(true)}
              onOpenWelcomePromo={() => setShowWelcomePromo(true)}
              luckyDrawCountdown={formattedLuckyDrawCountdown}
              onSwitchTab={(tab) => {
                setShowWithdrawal(false);
                setPendingPayment(null);
                setCurrentTab(tab);
              }}
              onOpenPayment={(level, cost) => {
                handleOpenPayment(level, cost, 'upgrade');
              }}
              onShowCompanyInfo={handleShowCompanyInfo}
              livePayouts={livePayouts}
              formattedCountdown={formattedCountdown}
            />
          ) : currentTab === 'task' ? (
            <TaskView
              userState={userState}
              language={language}
              formattedCountdown={formattedCountdown}
              isTaskAvailable={isTaskAvailable}
              onCompleteTask={handleCompleteTask}
            />
          ) : currentTab === 'team' ? (
            <TeamView
              userState={userState}
              language={language}
              onCopyText={handleCopyText}
            />
          ) : currentTab === 'vip' ? (
            <VipView
              userState={userState}
              language={language}
              onUpgradeTier={(level, price) => handleOpenPayment(level, price, 'upgrade')}
              onOpenPayment={(level, price) => handleOpenPayment(level, price, 'upgrade')}
            />
          ) : (
            <MeView
              userState={userState}
              language={language}
              onOpenWithdrawal={() => {
                setShowWithdrawal(true);
                setPendingPayment(null);
              }}
              onOpenRecharge={() => {
                handleOpenPayment('USDT Recharge', 50.0, 'recharge');
              }}
              onOpenRecords={() => setShowRecords(true)}
              onOpenHtmlCode={() => setShowHtmlModal(true)}
              onSignOut={handleSignOut}
              onCopyText={handleCopyText}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Bottom Navigation Bar */}
        <Navigation
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setShowWithdrawal(false);
            setPendingPayment(null);
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          language={language}
        />

        {/* VIP Introduction & Attraction Welcome Modal */}
        {showWelcomePromo && (
          <WelcomePromoModal
            language={language}
            onClose={handleClosePromo}
            onProceedToLuckyWheel={handleProceedFromPromoToWheel}
            onGoToVip={handleGoToVipFromPromo}
          />
        )}

        {/* Lucky Wheel Modal */}
        {showLuckyWheel && (
          <LuckyWheelModal
            remainingDraws={userState.luckyDrawRemaining}
            countdown={formattedLuckyDrawCountdown}
            language={language}
            onClose={() => setShowLuckyWheel(false)}
            onSpin={handleSpinLuckyWheel}
            onGoToVip={() => {
              setShowLuckyWheel(false);
              setCurrentTab('vip');
            }}
            onShare={() => {
              handleCopyText(
                `${window.location.origin}/#/register?inv=${encodeURIComponent(userState.inviteCode)}`,
                language === 'ar' ? 'رابط المشاركة' : 'Share link'
              );
            }}
          />
        )}

        {/* Financial Records Modal */}
        {showRecords && (
          <RecordsModal
            records={userState.records}
            language={language}
            onClose={() => setShowRecords(false)}
          />
        )}

        {/* HTML Source Code Modal (for the user to view & copy the raw HTML directly) */}
        {showHtmlModal && (
          <HtmlCodeModal
            language={language}
            onClose={() => setShowHtmlModal(false)}
            onShowToast={showToast}
          />
        )}

        {/* Notification Toast */}
        {toast.visible && (
          <div
            id="toast"
            className="fixed top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl text-xs z-50 transition-all font-bold border border-gray-700 max-w-xs text-center"
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}
