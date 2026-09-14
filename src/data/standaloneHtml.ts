export const STANDALONE_HTML_CODE = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Capital Luxury Cars - منصة أسطول السيارات الفاخرة</title>
  <!-- خط Cairo للعربية و Inter للأرقام -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <!-- Tailwind CSS عبر CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Cairo', 'sans-serif'],
            mono: ['Inter', 'monospace']
          },
          colors: {
            brand: {
              50: '#fff1f2',
              100: '#ffe4e6',
              500: '#f43f5e',
              600: '#e11d48',
              700: '#be123c',
              900: '#881337',
            }
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Cairo', sans-serif; }
    .car-card:hover img { transform: scale(1.05); }
    .wheel-spin { transition: transform 3s cubic-bezier(0.15, 0.9, 0.2, 1); }
  </style>
</head>
<body class="bg-gray-100 text-gray-800 antialiased min-h-screen pb-20">

  <!-- شريط التنقل العلوي -->
  <header class="bg-red-600 text-white sticky top-0 z-40 shadow-md">
    <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="bg-white text-red-600 p-1.5 rounded-xl font-bold flex items-center justify-center w-8 h-8 shadow-sm">
          🏎️
        </div>
        <div>
          <span class="font-bold text-base tracking-tight block leading-tight">Capital Luxury Cars</span>
          <span class="text-[10px] text-red-100 block leading-none font-medium">أسطول السيارات الفاخرة</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="toggleLang()" class="bg-white/20 hover:bg-white/30 text-xs px-2.5 py-1.5 rounded-full font-semibold transition">
          🌐 <span id="lang-label">English</span>
        </button>
        <button onclick="alert('خدمة العملاء متاحة 24/7')" class="bg-white/20 hover:bg-white/30 w-8 h-8 rounded-full flex items-center justify-center text-xs">
          🎧
        </button>
      </div>
    </div>
  </header>

  <!-- شريط تنبيه المدة 24 ساعة -->
  <div class="bg-gray-900 text-amber-300 px-4 py-2 text-[11px] font-semibold border-b border-gray-800">
    <div class="max-w-md mx-auto flex items-center justify-between">
      <span>⏱️ مهلة السحب وتأكيد الإيداع: خلال 24 ساعة</span>
      <span class="text-gray-400 font-mono text-[10px]">الحد الأدنى: 10 USDT</span>
    </div>
  </div>

  <!-- المحتوى الرئيسي للموقع -->
  <main class="max-w-md mx-auto px-4 py-4 space-y-4">
    
    <!-- بطاقة الرصيد والترحيب -->
    <div class="bg-gradient-to-r from-gray-900 via-gray-800 to-red-950 text-white rounded-3xl p-5 shadow-xl border border-gray-800">
      <div class="flex items-start justify-between">
        <div>
          <span class="inline-block bg-red-600/80 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-red-100">
            مرحباً بك • <span id="user-vip">VIP0</span>
          </span>
          <h2 class="font-bold text-lg mt-1.5">استثمر بذكاء. اربح يومياً.</h2>
          <p class="text-xs text-gray-300 mt-1 max-w-[260px] leading-relaxed">
            إدارة أسطول السيارات الرياضية الفاخرة، إتمام المهام اليومية وسحب الأرباح بسهولة.
          </p>
        </div>
        <button onclick="openLuckyWheel()" class="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-amber-300 text-xl shadow">
          🎁
        </button>
      </div>
      <div class="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/10">
        <div class="bg-white/5 rounded-2xl p-3 border border-white/5">
          <p class="text-[11px] text-gray-400 font-medium">رصيد الحساب</p>
          <p class="font-extrabold text-base mt-0.5 text-white">
            <span id="balance-display" class="font-mono">15.50</span> <span class="text-xs text-red-400 font-semibold">USDT</span>
          </p>
        </div>
        <div onclick="openLuckyWheel()" class="bg-white/5 hover:bg-white/10 rounded-2xl p-3 border border-white/5 cursor-pointer transition">
          <div class="flex items-center justify-between">
            <p class="text-[11px] text-gray-400 font-medium">عجلة الحظ</p>
            <span>✨</span>
          </div>
          <p class="font-extrabold text-base mt-0.5 text-amber-300">
            <span id="spins-display">1</span> <span class="text-xs text-gray-300 font-normal">فرصة مجانية</span>
          </p>
        </div>
      </div>
    </div>

    <!-- أزرار الإجراء السريع -->
    <div class="grid grid-cols-2 gap-3">
      <button onclick="showWithdrawSection()" class="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition text-start">
        <div class="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg">
          💸
        </div>
        <div>
          <h4 class="text-xs font-bold text-gray-800">سحب الأرباح</h4>
          <p class="text-[10px] text-gray-400">سحب فوري لمحفظتك</p>
        </div>
      </button>
      <button onclick="showRechargeModal()" class="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition text-start">
        <div class="bg-red-100 text-red-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg">
          💳
        </div>
        <div>
          <h4 class="text-xs font-bold text-gray-800">شحن الرصيد</h4>
          <p class="text-[10px] text-gray-400">إيداع عبر USDT</p>
        </div>
      </button>
    </div>

    <!-- بنر إعلاني لأسطول السيارات الفاخرة -->
    <div class="relative rounded-3xl overflow-hidden shadow-lg bg-gradient-to-r from-red-600 to-red-900 text-white p-4">
      <span class="bg-white/20 text-[10px] px-2.5 py-0.5 rounded-full font-semibold inline-block">
        أسطول عالمي معتمد
      </span>
      <h3 class="font-bold text-base mt-1.5">تأجير فيراري، بورشه ولمبورغيني</h3>
      <p class="text-[11px] text-red-100 mt-1">عائدات يومية مؤكدة تنزل بحسابك يومياً بعد تنفيذ مهمة الفحص والتأجير.</p>
      <div class="mt-3 rounded-2xl overflow-hidden h-36 bg-gray-900 relative">
        <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80" alt="Supercar" class="w-full h-full object-cover">
      </div>
    </div>

    <!-- بطاقات سيارات الأسطول وباقات VIP -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-gray-900 text-sm flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
          <span>أسطول السيارات وباقات VIP</span>
        </h3>
        <span class="text-xs text-red-600 font-semibold">تجديد يومي</span>
      </div>

      <div class="grid grid-cols-2 gap-3" id="fleet-cars-grid">
        <!-- سيارة VIP0 -->
        <div class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between car-card">
          <div class="relative h-28 bg-gray-50 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80" alt="Toyota GR Supra" class="w-full h-full object-cover transition duration-300">
            <span class="absolute top-1.5 right-1.5 bg-gray-900/90 text-white text-[9px] px-2 py-0.5 rounded-md font-bold">VIP0</span>
          </div>
          <div class="mt-2.5">
            <p class="text-[10px] text-gray-500 font-medium truncate">Toyota GR Supra</p>
            <p class="font-bold text-gray-900 text-sm">+1.50 USDT <span class="text-[10px] font-normal text-gray-400">يومياً</span></p>
          </div>
          <button onclick="claimDailyTask()" class="mt-2.5 w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2 rounded-xl font-bold shadow-sm transition">
            إتمام المهمة (+1.50$)
          </button>
        </div>

        <!-- سيارة VIP1 -->
        <div class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between car-card">
          <div class="relative h-28 bg-gray-50 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80" alt="Mercedes-AMG GT" class="w-full h-full object-cover transition duration-300">
            <span class="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-md font-bold">VIP1</span>
          </div>
          <div class="mt-2.5">
            <p class="text-[10px] text-gray-500 font-medium truncate">Mercedes-AMG GT</p>
            <p class="font-bold text-gray-900 text-sm">+7.50 USDT <span class="text-[10px] font-normal text-gray-400">يومياً</span></p>
          </div>
          <button onclick="upgradeVip('VIP1', 15)" class="mt-2.5 w-full bg-gray-900 hover:bg-black text-white text-xs py-2 rounded-xl font-bold shadow-sm transition">
            ترقية (15 USDT)
          </button>
        </div>

        <!-- سيارة VIP2 -->
        <div class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between car-card">
          <div class="relative h-28 bg-gray-50 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80" alt="Porsche 911 GT3" class="w-full h-full object-cover transition duration-300">
            <span class="absolute top-1.5 right-1.5 bg-gray-900/90 text-white text-[9px] px-2 py-0.5 rounded-md font-bold">VIP2</span>
          </div>
          <div class="mt-2.5">
            <p class="text-[10px] text-gray-500 font-medium truncate">Porsche 911 GT3</p>
            <p class="font-bold text-gray-900 text-sm">+32.00 USDT <span class="text-[10px] font-normal text-gray-400">يومياً</span></p>
          </div>
          <button onclick="upgradeVip('VIP2', 60)" class="mt-2.5 w-full bg-gray-900 hover:bg-black text-white text-xs py-2 rounded-xl font-bold shadow-sm transition">
            ترقية (60 USDT)
          </button>
        </div>

        <!-- سيارة VIP3 -->
        <div class="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col justify-between car-card">
          <div class="relative h-28 bg-gray-50 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=400&q=80" alt="Ferrari F8 Tributo" class="w-full h-full object-cover transition duration-300">
            <span class="absolute top-1.5 right-1.5 bg-gray-900/90 text-white text-[9px] px-2 py-0.5 rounded-md font-bold">VIP3</span>
          </div>
          <div class="mt-2.5">
            <p class="text-[10px] text-gray-500 font-medium truncate">Ferrari F8 Tributo</p>
            <p class="font-bold text-gray-900 text-sm">+105.00 USDT <span class="text-[10px] font-normal text-gray-400">يومياً</span></p>
          </div>
          <button onclick="upgradeVip('VIP3', 200)" class="mt-2.5 w-full bg-gray-900 hover:bg-black text-white text-xs py-2 rounded-xl font-bold shadow-sm transition">
            ترقية (200 USDT)
          </button>
        </div>
      </div>
    </div>

    <!-- جدول السحوبات المباشرة للأعضاء -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-bold text-gray-800 text-xs flex items-center gap-1.5">
          <span>إشعارات سحوبات الأعضاء المباشرة</span>
        </h3>
        <span class="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>مباشر</span>
        </span>
      </div>
      <div class="space-y-2 text-xs">
        <div class="flex justify-between items-center py-1.5 border-b border-gray-50">
          <span class="text-gray-600 font-medium"><span class="bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded text-[10px]">VIP4</span> +447******8124</span>
          <span class="text-emerald-600 font-bold font-mono">+1,460.00 USDT</span>
        </div>
        <div class="flex justify-between items-center py-1.5 border-b border-gray-50">
          <span class="text-gray-600 font-medium"><span class="bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded text-[10px]">VIP2</span> +966******4312</span>
          <span class="text-emerald-600 font-bold font-mono">+96.00 USDT</span>
        </div>
        <div class="flex justify-between items-center py-1.5">
          <span class="text-gray-600 font-medium"><span class="bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded text-[10px]">VIP1</span> +971******8890</span>
          <span class="text-emerald-600 font-bold font-mono">+25.50 USDT</span>
        </div>
      </div>
    </div>

  </main>

  <!-- نافذة عجلة الحظ (Modal) -->
  <div id="wheel-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-3xl max-w-xs w-full p-5 text-center text-gray-800 shadow-2xl relative">
      <button onclick="closeLuckyWheel()" class="absolute top-3 left-3 w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">✕</button>
      <h3 class="font-extrabold text-base text-gray-900 mt-2">عجلة الحظ اليومية 🎁</h3>
      <p class="text-xs text-gray-500 mt-1">فرصة مجانية لربح USDT مباشرة</p>
      
      <div class="relative w-48 h-48 mx-auto my-4 rounded-full border-4 border-red-500 overflow-hidden shadow-inner flex items-center justify-center bg-gradient-to-tr from-red-100 to-amber-100" id="wheel-disc">
        <div class="text-center">
          <span class="text-2xl font-black text-red-600">🎯</span>
          <p class="text-xs font-bold text-gray-700 mt-1">جوائز حتى 50$</p>
        </div>
      </div>

      <button onclick="spinTheWheel()" id="spin-btn" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-2xl shadow transition">
        تدوير العجلة الآن
      </button>
      <p id="wheel-result" class="text-xs font-bold text-emerald-600 mt-2 min-h-[20px]"></p>
    </div>
  </div>

  <script>
    let balance = 15.50;
    let vipLevel = 'VIP0';
    let luckyDrawChances = 1;

    function updateUi() {
      document.getElementById('balance-display').innerText = balance.toFixed(2);
      document.getElementById('user-vip').innerText = vipLevel;
      document.getElementById('spins-display').innerText = luckyDrawChances;
    }

    function claimDailyTask() {
      balance += 1.50;
      updateUi();
      alert('تهانينا! تم إنجاز مهمة تأجير تويوتا سوبرا وإضافة +1.50 USDT إلى رصيدك.');
    }

    function upgradeVip(tier, cost) {
      if (confirm('هل ترغب في ترقية حسابك إلى ' + tier + ' بسعر ' + cost + ' USDT؟\\nمهلة مراجعة وتفعيل الحساب: خلال 24 ساعة.')) {
        vipLevel = tier;
        updateUi();
        alert('تم تقديم طلب الترقية إلى ' + tier + ' بنجاح! سيتم التفعيل خلال 24 ساعة.');
      }
    }

    function showWithdrawSection() {
      if (vipLevel === 'VIP0') {
        alert('تنبيه: حسابات VIP0 التجريبية لا يمكنها السحب!\\nيجب الترقية إلى VIP1 كحد أدنى، والحد الأدنى للسحب هو 10 USDT.');
      } else {
        const amount = prompt('أدخل مبلغ السحب بالـ USDT (الحد الأدنى 10 USDT):', '10.00');
        if (amount && parseFloat(amount) >= 10) {
          alert('تم تقديم طلب سحب ' + amount + ' USDT بنجاح! مدة المعالجة وإرسال الأموال: خلال 24 ساعة.');
        }
      }
    }

    function showRechargeModal() {
      alert('عنوان إيداع USDT (TRC20):\\nTZ59apGTCsnp3X3gz2PiBh26QVW5K2aq9Q\\nمهلة تأكيد الإيداع: خلال 24 ساعة.');
    }

    function openLuckyWheel() {
      document.getElementById('wheel-modal').classList.remove('hidden');
    }

    function closeLuckyWheel() {
      document.getElementById('wheel-modal').classList.add('hidden');
    }

    function spinTheWheel() {
      if (luckyDrawChances <= 0) {
        alert('لقد استخدمت فرصة اليوم! تتجدد كل 24 ساعة.');
        return;
      }
      luckyDrawChances--;
      const prize = (Math.random() * 1.5 + 0.5).toFixed(2);
      balance += parseFloat(prize);
      updateUi();
      document.getElementById('wheel-result').innerText = 'تهانينا! لقد ربحت +' + prize + ' USDT!';
      document.getElementById('spin-btn').disabled = true;
      document.getElementById('spin-btn').innerText = 'تم التدوير اليوم';
    }

    function toggleLang() {
      const isRtl = document.documentElement.dir === 'rtl';
      document.documentElement.dir = isRtl ? 'ltr' : 'rtl';
      document.getElementById('lang-label').innerText = isRtl ? 'العربية' : 'English';
    }
  </script>
</body>
</html>`;
