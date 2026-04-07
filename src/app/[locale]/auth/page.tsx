'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Building2, Mail, Lock, User, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'ar';
  const isRTL = locale === 'ar';

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'company' | 'provider'>('company');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // MVP: No actual auth — would connect to Supabase Auth
    alert(mode === 'login' ? 'Login flow (connect to Supabase)' : 'Registration flow (connect to Supabase)');
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-[#c41e3a]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {locale === 'ar' ? 'سكن القوى العاملة' : 'Sakan Workforce'}
          </h1>
          <p className="text-gray-500 mt-1">
            {locale === 'ar' ? 'منصة سكن العمال الأولى في المملكة' : "Saudi Arabia's Premier Worker Housing Platform"}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
              mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            {t('login')}
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
              mode === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            {t('register')}
          </button>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <>
                  {/* Role Selection */}
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <button
                      type="button"
                      onClick={() => setRole('company')}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        role === 'company'
                          ? 'border-[#c41e3a] bg-[#fef2f2] text-[#a91b32]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">
                        {locale === 'ar' ? 'شركة' : 'Company'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('provider')}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        role === 'provider'
                          ? 'border-[#c41e3a] bg-[#fef2f2] text-[#a91b32]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">
                        {locale === 'ar' ? 'مالك عقار' : 'Property Owner'}
                      </span>
                    </button>
                  </div>

                  <Input
                    label={locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    icon={<User className="w-4 h-4" />}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={locale === 'ar' ? 'محمد أحمد' : 'Mohammed Ahmed'}
                    required
                  />

                  <Input
                    label={locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    icon={<Phone className="w-4 h-4" />}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    required
                  />
                </>
              )}

              <Input
                label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                icon={<Mail className="w-4 h-4" />}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.sa"
                required
              />

              <Input
                label={locale === 'ar' ? 'كلمة المرور' : 'Password'}
                icon={<Lock className="w-4 h-4" />}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <Button type="submit" variant="primary" size="lg" className="w-full">
                {mode === 'login' ? t('login') : t('register')}
                <Arrow className="w-4 h-4 ms-2" />
              </Button>
            </form>

            {mode === 'login' && (
              <p className="text-center text-sm text-gray-500 mt-4">
                {locale === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot your password?'}
                <button className="text-[#c41e3a] font-medium ms-1 hover:underline">
                  {locale === 'ar' ? 'إعادة تعيين' : 'Reset'}
                </button>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Demo note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          {locale === 'ar'
            ? 'هذا عرض توضيحي — سيتم ربط المصادقة بـ Supabase Auth في الإصدار التالي'
            : 'Demo mode — Authentication will be connected to Supabase Auth in the next release'}
        </p>
      </div>
    </div>
  );
}
