'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  User,
  Building2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Check,
  Phone,
  Mail,
  Users as UsersIcon,
  BedDouble,
  ClipboardCheck,
  UtensilsCrossed,
  Bus,
  Sparkles,
  Wrench,
} from 'lucide-react';

interface RequestWizardProps {
  open: boolean;
  onClose: () => void;
  locale: string;
}

type UserType = 'individual' | 'company' | null;
type RoomType = 'shared' | 'technician' | 'engineer' | 'driver' | '';
type AddonKey = 'catering' | 'transport' | 'cleaning' | 'maintenance';

interface WizardState {
  userType: UserType;
  companyName: string;
  region: string;
  areaDirection: string;
  workerCount: string;
  roomType: RoomType;
  addons: AddonKey[];
  fullName: string;
  phone: string;
  email: string;
}

const initialState: WizardState = {
  userType: null,
  companyName: '',
  region: 'riyadh',
  areaDirection: '',
  workerCount: '',
  roomType: '',
  addons: [],
  fullName: '',
  phone: '',
  email: '',
};

export function RequestWizard({ open, onClose, locale }: RequestWizardProps) {
  const router = useRouter();
  const isAr = locale === 'ar';
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setStep(1);
        setState(initialState);
        setSubmitted(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!open) return null;

  const update = <K extends keyof WizardState>(key: K, value: WizardState[K]) => {
    setState((s) => ({ ...s, [key]: value }));
  };

  const toggleAddon = (key: AddonKey) => {
    setState((s) => ({
      ...s,
      addons: s.addons.includes(key) ? s.addons.filter((k) => k !== key) : [...s.addons, key],
    }));
  };

  const addons: { key: AddonKey; ar: string; en: string; icon: typeof User; descAr: string; descEn: string }[] = [
    { key: 'catering', ar: 'إعاشة', en: 'Catering', icon: UtensilsCrossed, descAr: '٣ وجبات يومياً', descEn: '3 meals/day' },
    { key: 'transport', ar: 'نقل', en: 'Transport', icon: Bus, descAr: 'ذهاب وإياب للعمل', descEn: 'Daily commute' },
    { key: 'cleaning', ar: 'نظافة', en: 'Cleaning', icon: Sparkles, descAr: 'تنظيف دوري', descEn: 'Periodic cleaning' },
    { key: 'maintenance', ar: 'صيانة', en: 'Maintenance', icon: Wrench, descAr: 'دعم على مدار الساعة', descEn: '24/7 support' },
  ];

  const steps = [
    { n: 1, labelAr: 'الاحتياجات', labelEn: 'Needs' },
    { n: 2, labelAr: 'الموقع', labelEn: 'Location' },
    { n: 3, labelAr: 'التواصل', labelEn: 'Contact' },
    { n: 4, labelAr: 'المراجعة', labelEn: 'Review' },
  ];

  const canProceed = () => {
    if (step === 1) return state.userType !== null && state.workerCount && state.roomType;
    if (step === 2) return state.areaDirection;
    if (step === 3) return state.fullName && state.phone;
    return true;
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      router.push(`/${locale}/search`);
    }, 2500);
  };

  const areas = [
    { key: 'north', ar: 'شمال', en: 'North' },
    { key: 'south', ar: 'جنوب', en: 'South' },
    { key: 'east', ar: 'شرق', en: 'East' },
    { key: 'west', ar: 'غرب', en: 'West' },
    { key: 'central', ar: 'وسط', en: 'Central' },
  ];

  const rooms = [
    { key: 'shared' as RoomType, ar: 'مشترك', en: 'Shared' },
    { key: 'technician' as RoomType, ar: 'فنيين', en: 'Technicians' },
    { key: 'engineer' as RoomType, ar: 'مهندسين', en: 'Engineers' },
    { key: 'driver' as RoomType, ar: 'سائقين', en: 'Drivers' },
  ];

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-up">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0a0a0a]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl">
        {/* Header */}
        <div className="relative border-b border-black/5 px-6 py-5 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 end-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f5] text-[#525252] transition-colors hover:bg-[#e5e5e5]"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="text-start">
            <h2 className="text-xl font-bold text-[#0a0a0a]">
              {isAr ? 'طلب خدمة سكن' : 'Housing Request'}
            </h2>
            <p className="mt-0.5 text-sm text-[#737373]">
              {isAr ? 'املأ البيانات وسيتواصل معك فريقنا' : 'Fill in your needs and our team will reach out'}
            </p>
          </div>
        </div>

        {/* Stepper */}
        <div className="border-b border-black/5 px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => {
              const isDone = step > s.n;
              const isActive = step === s.n;
              return (
                <div key={s.n} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-[#c41e3a] text-white shadow-lg shadow-[#c41e3a]/30 scale-110'
                          : isDone
                          ? 'bg-[#c41e3a]/90 text-white'
                          : 'bg-[#f5f5f5] text-[#a3a3a3]'
                      }`}
                    >
                      {isDone ? <Check className="h-4 w-4" /> : s.n}
                    </div>
                    <span
                      className={`mt-1.5 text-[10px] font-medium uppercase tracking-wide ${
                        isActive ? 'text-[#c41e3a]' : isDone ? 'text-[#525252]' : 'text-[#a3a3a3]'
                      }`}
                    >
                      {isAr ? s.labelAr : s.labelEn}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`mx-2 h-px flex-1 transition-colors ${
                        step > s.n ? 'bg-[#c41e3a]' : 'bg-[#e5e5e5]'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[55vh] overflow-y-auto px-6 py-6 sm:px-8">
          {submitted ? (
            <SuccessStep isAr={isAr} />
          ) : (
            <>
              {step === 1 && <Step1Needs state={state} update={update} toggleAddon={toggleAddon} isAr={isAr} rooms={rooms} addons={addons} />}
              {step === 2 && <Step2Location state={state} update={update} isAr={isAr} areas={areas} />}
              {step === 3 && <Step3Contact state={state} update={update} isAr={isAr} />}
              {step === 4 && <Step4Review state={state} isAr={isAr} areas={areas} rooms={rooms} addons={addons} />}
            </>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="flex items-center justify-between border-t border-black/5 bg-[#fafafa] px-6 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-[#525252] transition-colors hover:bg-[#e5e5e5]"
            >
              <BackArrow className="h-4 w-4" />
              {step > 1 ? (isAr ? 'السابق' : 'Back') : (isAr ? 'إلغاء' : 'Cancel')}
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#c41e3a] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#c41e3a]/20 transition-all hover:bg-[#a91b32] hover:shadow-xl hover:shadow-[#c41e3a]/30 disabled:cursor-not-allowed disabled:bg-[#d4d4d4] disabled:text-[#a3a3a3] disabled:shadow-none"
            >
              {step === 4
                ? isAr ? 'إرسال الطلب' : 'Submit Request'
                : isAr ? 'التالي' : 'Next'}
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   STEP 1 — Needs
   ────────────────────────────────────────── */
function Step1Needs({
  state,
  update,
  toggleAddon,
  isAr,
  rooms,
  addons,
}: {
  state: WizardState;
  update: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void;
  toggleAddon: (key: AddonKey) => void;
  isAr: boolean;
  rooms: { key: RoomType; ar: string; en: string }[];
  addons: { key: AddonKey; ar: string; en: string; icon: typeof User; descAr: string; descEn: string }[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-bold text-[#0a0a0a]">
          {isAr ? 'أخبرنا عن احتياجك' : 'Tell us your need'}
        </h3>
        <p className="text-sm text-[#737373]">
          {isAr ? 'هذه المعلومات تساعدنا في إيجاد الحل المناسب لك' : 'This helps us find the right solution for you'}
        </p>
      </div>

      {/* User type */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#404040]">
          {isAr ? 'أنت؟' : 'You are?'}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <TypeCard
            active={state.userType === 'individual'}
            onClick={() => update('userType', 'individual')}
            icon={User}
            label={isAr ? 'فرد' : 'Individual'}
          />
          <TypeCard
            active={state.userType === 'company'}
            onClick={() => update('userType', 'company')}
            icon={Building2}
            label={isAr ? 'شركة' : 'Company'}
          />
        </div>
      </div>

      {/* Company name (conditional) */}
      {state.userType === 'company' && (
        <FormField
          label={isAr ? 'اسم الشركة' : 'Company Name'}
          icon={Building2}
          value={state.companyName}
          onChange={(v) => update('companyName', v)}
          placeholder={isAr ? 'مثال: شركة البناء المتقدمة' : 'e.g. Advanced Construction Co.'}
        />
      )}

      {/* Worker count */}
      <FormField
        label={isAr ? 'عدد الأفراد' : 'Number of Individuals'}
        icon={UsersIcon}
        type="number"
        value={state.workerCount}
        onChange={(v) => update('workerCount', v)}
        placeholder="50"
      />

      {/* Room type */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#404040]">
          {isAr ? 'نوع الغرفة' : 'Room Type'}
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {rooms.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => update('roomType', r.key)}
              className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                state.roomType === r.key
                  ? 'border-[#c41e3a] bg-[#fef2f2] text-[#c41e3a] font-semibold'
                  : 'border-black/5 bg-white text-[#525252] hover:border-black/10'
              }`}
            >
              <BedDouble className="h-3.5 w-3.5" />
              {isAr ? r.ar : r.en}
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <label className="block text-sm font-medium text-[#404040]">
            {isAr ? 'خدمات إضافية' : 'Add-on Services'}
          </label>
          <span className="text-[11px] text-[#a3a3a3]">
            {isAr ? 'اختياري — حدد ما تحتاج' : 'Optional — pick what you need'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {addons.map((a) => {
            const active = state.addons.includes(a.key);
            const Icon = a.icon;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => toggleAddon(a.key)}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-start transition-all ${
                  active
                    ? 'border-[#c41e3a] bg-[#fef2f2]'
                    : 'border-black/5 bg-white hover:border-black/10'
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    active ? 'bg-[#c41e3a] text-white' : 'bg-[#f5f5f5] text-[#737373]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold leading-tight ${active ? 'text-[#c41e3a]' : 'text-[#0a0a0a]'}`}>
                    {isAr ? a.ar : a.en}
                  </p>
                  <p className="text-[11px] text-[#737373] truncate">
                    {isAr ? a.descAr : a.descEn}
                  </p>
                </div>
                {active && <Check className="h-4 w-4 shrink-0 text-[#c41e3a]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   STEP 2 — Location
   ────────────────────────────────────────── */
function Step2Location({
  state,
  update,
  isAr,
  areas,
}: {
  state: WizardState;
  update: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void;
  isAr: boolean;
  areas: { key: string; ar: string; en: string }[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-bold text-[#0a0a0a]">
          {isAr ? 'أين تريد السكن؟' : 'Where do you want housing?'}
        </h3>
        <p className="text-sm text-[#737373]">
          {isAr ? 'حدد المدينة والمنطقة المفضلة' : 'Select your preferred city and area'}
        </p>
      </div>

      {/* City */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#404040]">
          {isAr ? 'المدينة' : 'City'}
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-[#c41e3a]/20 bg-[#fef2f2] px-4 py-3">
          <MapPin className="h-4 w-4 text-[#c41e3a]" />
          <span className="font-medium text-[#c41e3a]">{isAr ? 'الرياض' : 'Riyadh'}</span>
          <span className="ms-auto text-[10px] text-[#c41e3a]/70">{isAr ? 'متاح حالياً' : 'Available now'}</span>
        </div>
      </div>

      {/* Area */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#404040]">
          {isAr ? 'المنطقة' : 'Direction'}
        </label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {areas.map((a) => (
            <button
              key={a.key}
              type="button"
              onClick={() => update('areaDirection', a.key)}
              className={`rounded-xl border px-2 py-3 text-sm transition-all ${
                state.areaDirection === a.key
                  ? 'border-[#c41e3a] bg-[#fef2f2] text-[#c41e3a] font-semibold'
                  : 'border-black/5 bg-white text-[#525252] hover:border-black/10'
              }`}
            >
              {isAr ? a.ar : a.en}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   STEP 3 — Contact
   ────────────────────────────────────────── */
function Step3Contact({
  state,
  update,
  isAr,
}: {
  state: WizardState;
  update: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void;
  isAr: boolean;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-1 text-lg font-bold text-[#0a0a0a]">
          {isAr ? 'معلومات التواصل' : 'Contact Information'}
        </h3>
        <p className="text-sm text-[#737373]">
          {isAr ? 'كيف نتواصل معك؟' : 'How should we reach you?'}
        </p>
      </div>

      <FormField
        label={isAr ? 'الاسم الكامل' : 'Full Name'}
        icon={User}
        value={state.fullName}
        onChange={(v) => update('fullName', v)}
        placeholder={isAr ? 'محمد أحمد' : 'Mohammed Ahmed'}
      />

      <FormField
        label={isAr ? 'رقم الجوال' : 'Phone Number'}
        icon={Phone}
        value={state.phone}
        onChange={(v) => update('phone', v)}
        placeholder="+966 5X XXX XXXX"
        type="tel"
      />

      <FormField
        label={isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)'}
        icon={Mail}
        value={state.email}
        onChange={(v) => update('email', v)}
        placeholder="name@example.com"
        type="email"
      />
    </div>
  );
}

/* ──────────────────────────────────────────
   STEP 4 — Review
   ────────────────────────────────────────── */
function Step4Review({
  state,
  isAr,
  areas,
  rooms,
  addons,
}: {
  state: WizardState;
  isAr: boolean;
  areas: { key: string; ar: string; en: string }[];
  rooms: { key: RoomType; ar: string; en: string }[];
  addons: { key: AddonKey; ar: string; en: string; icon: typeof User; descAr: string; descEn: string }[];
}) {
  const areaLabel = areas.find((a) => a.key === state.areaDirection);
  const roomLabel = rooms.find((r) => r.key === state.roomType);
  const selectedAddons = addons.filter((a) => state.addons.includes(a.key));
  const addonsValue = selectedAddons.length
    ? selectedAddons.map((a) => (isAr ? a.ar : a.en)).join(isAr ? '، ' : ', ')
    : isAr ? 'لا يوجد' : 'None';

  const rows = [
    { label: isAr ? 'النوع' : 'Type', value: state.userType === 'individual' ? (isAr ? 'فرد' : 'Individual') : (isAr ? `شركة — ${state.companyName || '—'}` : `Company — ${state.companyName || '—'}`) },
    { label: isAr ? 'عدد الأفراد' : 'Count', value: state.workerCount },
    { label: isAr ? 'نوع الغرفة' : 'Room', value: roomLabel ? (isAr ? roomLabel.ar : roomLabel.en) : '—' },
    { label: isAr ? 'خدمات إضافية' : 'Add-ons', value: addonsValue },
    { label: isAr ? 'الموقع' : 'Location', value: `${isAr ? 'الرياض' : 'Riyadh'} — ${areaLabel ? (isAr ? areaLabel.ar : areaLabel.en) : '—'}` },
    { label: isAr ? 'الاسم' : 'Name', value: state.fullName },
    { label: isAr ? 'الجوال' : 'Phone', value: state.phone },
    { label: isAr ? 'البريد' : 'Email', value: state.email || '—' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-1 text-lg font-bold text-[#0a0a0a]">
          {isAr ? 'مراجعة الطلب' : 'Review Your Request'}
        </h3>
        <p className="text-sm text-[#737373]">
          {isAr ? 'تأكد من صحة البيانات قبل الإرسال' : 'Confirm your details before submitting'}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/5 bg-[#fafafa]">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`flex items-center justify-between px-5 py-3 text-sm ${
              i !== rows.length - 1 ? 'border-b border-black/5' : ''
            }`}
          >
            <span className="text-[#737373]">{r.label}</span>
            <span className="font-medium text-[#0a0a0a]">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   SUCCESS
   ────────────────────────────────────────── */
function SuccessStep({ isAr }: { isAr: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2]">
        <ClipboardCheck className="h-8 w-8 text-[#c41e3a]" />
      </div>
      <h3 className="text-xl font-bold text-[#0a0a0a]">
        {isAr ? 'تم استلام طلبك!' : 'Request Received!'}
      </h3>
      <p className="max-w-sm text-sm text-[#525252]">
        {isAr
          ? 'سيتواصل فريقنا معك خلال 24 ساعة لمساعدتك في إيجاد السكن المناسب. سيتم توجيهك الآن لتصفح العقارات المتاحة.'
          : 'Our team will contact you within 24 hours. Redirecting you to browse available properties.'}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────
   SUB-COMPONENTS
   ────────────────────────────────────────── */
function TypeCard({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof User;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-5 transition-all ${
        active
          ? 'border-[#c41e3a] bg-[#fef2f2]'
          : 'border-black/5 bg-white hover:border-black/15'
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
          active ? 'bg-[#c41e3a] text-white' : 'bg-[#f5f5f5] text-[#737373] group-hover:bg-[#e5e5e5]'
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span
        className={`text-sm font-semibold ${
          active ? 'text-[#c41e3a]' : 'text-[#0a0a0a]'
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function FormField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  icon: typeof User;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#404040]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-[#a3a3a3]">
          <Icon className="h-4 w-4" />
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-xl border border-black/5 bg-white py-3 ps-10 pe-3 text-sm text-[#0a0a0a] placeholder:text-[#a3a3a3] transition-colors focus:border-[#c41e3a] focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/10"
        />
      </div>
    </div>
  );
}
