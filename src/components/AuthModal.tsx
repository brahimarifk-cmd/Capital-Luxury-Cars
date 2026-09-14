import React, { useState, useEffect } from 'react';
import { Car, Eye, EyeOff, UserCheck, LogIn, UserPlus } from 'lucide-react';
import { Language, UserState } from '../types';
import { translations } from '../data/translations';
import {
  getRegisteredUsers,
  authenticateUser,
  registerNewUser,
  RegisteredUser,
} from '../services/authService';

interface AuthModalProps {
  language: Language;
  onLoginSuccess: (identifier: string, method: 'email' | 'phone', restoredState?: UserState) => void;
  onShowToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  language,
  onLoginSuccess,
  onShowToast,
}) => {
  const t = translations[language];
  // Mode: 'signin' or 'signup'
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('demo_user@luxurycars.vip');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [invitationCode, setInvitationCode] = useState('777777');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registeredUsersList, setRegisteredUsersList] = useState<RegisteredUser[]>([]);

  // Load registered users on mount
  useEffect(() => {
    const list = getRegisteredUsers();
    setRegisteredUsersList(list);
  }, []);

  const handleSelectRegisteredAccount = (user: RegisteredUser) => {
    setIdentifier(user.identifier);
    setAuthMethod(user.method);
    setPassword(user.password);
    setConfirmPassword(user.password);
    setAuthMode('signin');
  };

  const handleSignIn = () => {
    const trimmedId = identifier.trim();
    const trimmedPass = password.trim();

    if (!trimmedId) {
      onShowToast(
        language === 'ar'
          ? `يرجى إدخال ${authMethod === 'phone' ? 'رقم الهاتف' : 'البريد الإلكتروني'}`
          : `Please enter your ${authMethod === 'phone' ? 'phone number' : 'email'}`
      );
      return;
    }

    if (!trimmedPass) {
      onShowToast(language === 'ar' ? 'يرجى إدخال كلمة المرور' : 'Please enter password');
      return;
    }

    // Verify against registered accounts database
    const authResult = authenticateUser(trimmedId, trimmedPass);

    if (!authResult.success) {
      if (authResult.error === 'NOT_FOUND') {
        onShowToast(
          language === 'ar'
            ? 'هذا الحساب غير مسجل! يرجى إنشاء حساب جديد أولاً.'
            : 'This account is not registered! Please sign up first.'
        );
      } else if (authResult.error === 'WRONG_PASSWORD') {
        onShowToast(
          language === 'ar'
            ? 'كلمة المرور غير صحيحة! يرجى التأكد من كلمة المرور.'
            : 'Incorrect password! Please verify your password.'
        );
      } else {
        onShowToast(
          language === 'ar' ? 'فشل تسجيل الدخول' : 'Sign in failed'
        );
      }
      return;
    }

    // Successfully authenticated
    const authenticatedUser = authResult.user!;
    onShowToast(
      language === 'ar'
        ? `تم تسجيل الدخول بنجاح! مرحباً (${authenticatedUser.identifier})`
        : `Signed in successfully! Welcome (${authenticatedUser.identifier})`
    );
    onLoginSuccess(authenticatedUser.identifier, authenticatedUser.method, authenticatedUser.userState);
  };

  const handleSignUp = () => {
    const trimmedId = identifier.trim();
    const trimmedPass = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedId) {
      onShowToast(
        language === 'ar'
          ? `يرجى إدخال ${authMethod === 'phone' ? 'رقم الهاتف' : 'البريد الإلكتروني'}`
          : `Please enter your ${authMethod === 'phone' ? 'phone number' : 'email'}`
      );
      return;
    }

    if (authMethod === 'email' && !trimmedId.includes('@')) {
      onShowToast(
        language === 'ar'
          ? 'يرجى إدخال بريد إلكتروني صحيح'
          : 'Please enter a valid email address'
      );
      return;
    }

    if (!trimmedPass) {
      onShowToast(language === 'ar' ? 'يرجى إدخال كلمة المرور' : 'Please enter password');
      return;
    }

    if (trimmedPass.length < 4) {
      onShowToast(
        language === 'ar'
          ? 'يجب أن لا تقل كلمة المرور عن 4 خانات'
          : 'Password must be at least 4 characters'
      );
      return;
    }

    if (trimmedPass !== trimmedConfirm) {
      onShowToast(language === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }

    // Register user
    const result = registerNewUser(trimmedId, authMethod, trimmedPass, invitationCode);

    if (!result.success) {
      if (result.error === 'EXISTS') {
        onShowToast(
          language === 'ar'
            ? 'هذا الحساب مسجل بالفعل مسبقاً! يرجى تسجيل الدخول.'
            : 'This account is already registered! Please sign in.'
        );
        setAuthMode('signin');
      } else {
        onShowToast(language === 'ar' ? 'فشل إنشاء الحساب' : 'Registration failed');
      }
      return;
    }

    const newUser = result.user!;
    setRegisteredUsersList(getRegisteredUsers());
    onShowToast(
      language === 'ar'
        ? 'تم إنشاء الحساب بنجاح! تم تسجيل الدخول تلقائياً.'
        : 'Account created successfully! Logged in automatically.'
    );
    onLoginSuccess(newUser.identifier, newUser.method, newUser.userState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md">
        {/* App Logo & Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-red-600 text-white shadow-xl">
            <Car className="w-8 h-8" />
          </div>
          <h1 className="font-black text-gray-900 text-xl mt-3.5 tracking-tight">{t.appName}</h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">{t.appSubtitle}</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
          {/* Main Auth Mode Tabs (Sign In vs Sign Up) */}
          <div className="flex bg-gray-100 p-1 rounded-2xl mb-5">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-red-600" />
              <span>{t.signIn}</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-red-600" />
              <span>{t.signUp}</span>
            </button>
          </div>

          {/* Sub Method Tabs (Email vs Phone) */}
          <div className="flex border-b border-gray-100 mb-4">
            <button
              type="button"
              onClick={() => setAuthMethod('email')}
              className={`flex-1 pb-2.5 text-xs font-bold transition cursor-pointer ${
                authMethod === 'email' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-400'
              }`}
            >
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 pb-2.5 text-xs font-bold transition cursor-pointer ${
                authMethod === 'phone' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-400'
              }`}
            >
              {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
            </button>
          </div>

          {/* Quick Previously Registered Accounts Chips */}
          {registeredUsersList.length > 0 && (
            <div className="mb-4 bg-gray-50 rounded-2xl p-3 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-red-600" />
                  <span>
                    {language === 'ar'
                      ? 'الحسابات المسجلة مسبقاً للتجربة السريعة:'
                      : 'Saved Accounts for Quick Login:'}
                  </span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {registeredUsersList.length} {language === 'ar' ? 'حساب' : 'accounts'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {registeredUsersList.map((user) => (
                  <button
                    key={user.identifier}
                    type="button"
                    onClick={() => handleSelectRegisteredAccount(user)}
                    className="bg-white border border-gray-200 text-gray-800 text-[11px] px-2.5 py-1 rounded-xl font-medium hover:border-red-400 hover:text-red-600 transition flex items-center gap-1 cursor-pointer"
                    title={language === 'ar' ? 'انقر لتعبئة هذا الحساب' : 'Click to sign in with this account'}
                  >
                    <span className="truncate max-w-[170px]">{user.identifier}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-3.5">
            <div>
              <label htmlFor="auth-identifier" className="block text-xs font-bold text-gray-700 mb-1.5">
                {authMethod === 'phone'
                  ? language === 'ar'
                    ? 'رقم الهاتف'
                    : 'Phone Number'
                  : language === 'ar'
                  ? 'البريد الإلكتروني'
                  : 'Email Address'}
              </label>
              <input
                id="auth-identifier"
                type={authMethod === 'phone' ? 'tel' : 'email'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  authMethod === 'phone'
                    ? '+966 50 123 4567'
                    : 'demo_user@luxurycars.vip'
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
              />
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-xs font-bold text-gray-700 mb-1.5">
                {t.password}
              </label>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Extra fields only for registration / Sign Up */}
            {authMode === 'signup' && (
              <>
                <div>
                  <label htmlFor="auth-confirm-password" className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t.confirmPassword}
                  </label>
                  <div className="relative">
                    <input
                      id="auth-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="******"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="auth-invitation-code" className="block text-xs font-bold text-gray-700 mb-1.5">
                    {t.invitationCode}
                  </label>
                  <input
                    id="auth-invitation-code"
                    type="text"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    placeholder="777777"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition font-mono"
                  />
                </div>
              </>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-5 space-y-2.5">
            {authMode === 'signin' ? (
              <button
                type="button"
                onClick={handleSignIn}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl py-3.5 text-xs font-bold shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.signIn}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl py-3.5 text-xs font-bold shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.signUp}</span>
              </button>
            )}

            {/* Quick Switch Toggle */}
            <div className="pt-2 text-center">
              {authMode === 'signin' ? (
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-xs text-gray-500 hover:text-red-600 transition cursor-pointer"
                >
                  {language === 'ar'
                    ? 'ليس لديك حساب؟ إنشاء حساب جديد'
                    : "Don't have an account? Sign up here"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-xs text-gray-500 hover:text-red-600 transition cursor-pointer"
                >
                  {language === 'ar'
                    ? 'لديك حساب بالفعل؟ تسجيل الدخول'
                    : 'Already registered? Sign in here'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
