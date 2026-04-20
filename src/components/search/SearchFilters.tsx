'use client';

import { useTranslations } from 'next-intl';
import {
  Search,
  Filter,
  ShieldCheck,
  Home,
  Wrench,
  UtensilsCrossed,
  Users as UsersIcon,
  BedDouble,
  Check,
  MapPin,
} from 'lucide-react';
import type { AreaDirection, RoomType } from '@/types';

export type ServicePackageKey = 'housing-only' | 'housing-operated' | 'housing-operated-catered' | '';

export interface FilterState {
  area_direction: AreaDirection | '';
  room_type: RoomType | '';
  service_package: ServicePackageKey;
  min_capacity: string;
  verified_only: boolean;
}

interface SearchFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  resultsCount?: number;
}

const CAPACITY_PRESETS = [
  { label: '1-10', value: '1' },
  { label: '50+', value: '50' },
  { label: '100+', value: '100' },
  { label: '500+', value: '500' },
];

export function SearchFilters({ filters, onChange, onClear, resultsCount }: SearchFiltersProps) {
  const t = useTranslations('search');
  const tc = useTranslations('common');

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const isAr = typeof document !== 'undefined' && document.documentElement.lang === 'ar';

  const packages: { key: ServicePackageKey; ar: string; en: string; icon: typeof Home; descAr: string; descEn: string }[] = [
    { key: 'housing-only',             ar: 'سكن بدون تشغيل',     en: 'Housing Only',                    icon: Home,             descAr: 'الوحدة فقط',                       descEn: 'Unit only' },
    { key: 'housing-operated',         ar: 'سكن مع تشغيل',       en: 'Housing + Operations',            icon: Wrench,           descAr: 'نظافة، مياه، صيانة',              descEn: 'Cleaning, water, maintenance' },
    { key: 'housing-operated-catered', ar: 'سكن مع تشغيل وإعاشة', en: 'Housing + Operations + Catering', icon: UtensilsCrossed,  descAr: 'الباقة الكاملة',                   descEn: 'Full package' },
  ];

  const rooms: { key: RoomType; ar: string; en: string }[] = [
    { key: 'shared',     ar: 'مشترك',  en: 'Shared' },
    { key: 'technician', ar: 'فنيين',  en: 'Technicians' },
    { key: 'engineer',   ar: 'مهندسين', en: 'Engineers' },
    { key: 'driver',     ar: 'سائقين',  en: 'Drivers' },
  ];

  const areas: { key: AreaDirection; ar: string; en: string }[] = [
    { key: 'north',   ar: 'شمال', en: 'North' },
    { key: 'south',   ar: 'جنوب', en: 'South' },
    { key: 'east',    ar: 'شرق',  en: 'East' },
    { key: 'west',    ar: 'غرب',  en: 'West' },
    { key: 'central', ar: 'وسط',  en: 'Central' },
  ];

  const activeCount = [
    filters.area_direction,
    filters.room_type,
    filters.service_package,
    filters.min_capacity,
    filters.verified_only,
  ].filter((v) => v !== '' && v !== false).length;

  return (
    <div className="space-y-6 rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#F15A29]" />
          <h2 className="text-lg font-bold text-[#0a0a0a]">{t('filters')}</h2>
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#F15A29] px-1.5 text-[11px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-[#F15A29] hover:underline"
          >
            {t('clearFilters')}
          </button>
        )}
      </div>

      {/* Verified toggle */}
      <button
        type="button"
        onClick={() => updateFilter('verified_only', !filters.verified_only)}
        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-start transition-all ${
          filters.verified_only
            ? 'border-[#F15A29] bg-[#FEF0E8]'
            : 'border-black/5 bg-[#fafafa] hover:border-black/10'
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
            filters.verified_only ? 'bg-[#F15A29] text-white' : 'bg-white text-[#737373]'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className={`text-sm font-semibold ${filters.verified_only ? 'text-[#F15A29]' : 'text-[#0a0a0a]'}`}>
            {isAr ? 'موثق من المنصة فقط' : 'Verified listings only'}
          </p>
        </div>
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            filters.verified_only ? 'border-[#F15A29] bg-[#F15A29]' : 'border-[#d4d4d4] bg-white'
          }`}
        >
          {filters.verified_only && <Check className="h-3 w-3 text-white" />}
        </div>
      </button>

      {/* Service package */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#404040]">
          {isAr ? 'باقة الخدمة' : 'Service Package'}
        </label>
        <div className="space-y-2">
          {packages.map((p) => {
            const active = filters.service_package === p.key;
            const Icon = p.icon;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => updateFilter('service_package', active ? '' : p.key)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-start transition-all ${
                  active
                    ? 'border-[#F15A29] bg-[#FEF0E8]'
                    : 'border-black/5 bg-white hover:border-black/10'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    active ? 'bg-[#F15A29] text-white' : 'bg-[#f5f5f5] text-[#737373]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold leading-tight ${active ? 'text-[#F15A29]' : 'text-[#0a0a0a]'}`}>
                    {isAr ? p.ar : p.en}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#737373]">
                    {isAr ? p.descAr : p.descEn}
                  </p>
                </div>
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    active ? 'border-[#F15A29] bg-[#F15A29]' : 'border-[#d4d4d4] bg-white'
                  }`}
                >
                  {active && <Check className="h-3 w-3 text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

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
              onClick={() => updateFilter('room_type', filters.room_type === r.key ? '' : r.key)}
              className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                filters.room_type === r.key
                  ? 'border-[#F15A29] bg-[#FEF0E8] text-[#F15A29] font-semibold'
                  : 'border-black/5 bg-white text-[#525252] hover:border-black/10'
              }`}
            >
              <BedDouble className="h-3.5 w-3.5" />
              {isAr ? r.ar : r.en}
            </button>
          ))}
        </div>
      </div>

      {/* Area direction */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#404040]">
          <MapPin className="me-1 inline h-3.5 w-3.5 text-[#F15A29]" />
          {isAr ? 'المنطقة (الرياض)' : 'Direction (Riyadh)'}
        </label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {areas.map((a) => (
            <button
              key={a.key}
              type="button"
              onClick={() => updateFilter('area_direction', filters.area_direction === a.key ? '' : a.key)}
              className={`rounded-xl border px-2 py-2.5 text-sm transition-all ${
                filters.area_direction === a.key
                  ? 'border-[#F15A29] bg-[#FEF0E8] text-[#F15A29] font-semibold'
                  : 'border-black/5 bg-white text-[#525252] hover:border-black/10'
              }`}
            >
              {isAr ? a.ar : a.en}
            </button>
          ))}
        </div>
      </div>

      {/* Capacity */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[#404040]">
          {t('minCapacity')}
        </label>
        <div className="relative">
          <UsersIcon className="pointer-events-none absolute inset-y-0 start-0 my-auto ms-3 h-4 w-4 text-[#a3a3a3]" />
          <input
            type="number"
            min={0}
            placeholder="0"
            value={filters.min_capacity}
            onChange={(e) => updateFilter('min_capacity', e.target.value)}
            className="block w-full rounded-xl border border-black/5 bg-white py-3 ps-10 pe-3 text-sm text-[#0a0a0a] placeholder:text-[#a3a3a3] transition-colors focus:border-[#F15A29] focus:outline-none focus:ring-2 focus:ring-[#F15A29]/10"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {CAPACITY_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => updateFilter('min_capacity', filters.min_capacity === preset.value ? '' : preset.value)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                filters.min_capacity === preset.value
                  ? 'border-[#F15A29] bg-[#F15A29] text-white'
                  : 'border-black/10 bg-white text-[#525252] hover:border-[#F15A29] hover:text-[#F15A29]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search button */}
      <button
        type="button"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F15A29] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F15A29]/20 transition-all hover:bg-[#D94C1E] hover:shadow-xl hover:shadow-[#F15A29]/30"
      >
        <Search className="h-4 w-4" />
        {resultsCount !== undefined
          ? t('resultsCount', { count: resultsCount })
          : tc('search')}
      </button>
    </div>
  );
}
