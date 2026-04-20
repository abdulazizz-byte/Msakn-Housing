'use client';

import { useTranslations } from 'next-intl';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Users,
  Search,
  Filter,
  UtensilsCrossed,
  Sparkles,
  Wrench,
  Bus,
  ShieldCheck,
} from 'lucide-react';
import type { AreaDirection, RoomType } from '@/types';

export interface FilterState {
  area_direction: AreaDirection | '';
  room_type: RoomType | '';
  min_price: string;
  max_price: string;
  min_capacity: string;
  has_catering: boolean;
  has_cleaning: boolean;
  has_maintenance: boolean;
  has_transportation: boolean;
  verified_only: boolean;
}

interface SearchFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  resultsCount?: number;
}

const PRICE_PRESETS = [
  { label: 'أقل من 600', labelEn: 'Under 600', value: '600' },
  { label: 'أقل من 1000', labelEn: 'Under 1000', value: '1000' },
  { label: 'أقل من 1500', labelEn: 'Under 1500', value: '1500' },
  { label: 'أقل من 2500', labelEn: 'Under 2500', value: '2500' },
];

const CAPACITY_PRESETS = [
  { label: '1-10', value: '1' },
  { label: '50+', value: '50' },
  { label: '100+', value: '100' },
  { label: '500+', value: '500' },
];

export function SearchFilters({ filters, onChange, onClear, resultsCount }: SearchFiltersProps) {
  const t = useTranslations('search');
  const ta = useTranslations('areas');
  const tr = useTranslations('roomTypes');
  const tp = useTranslations('property');
  const tc = useTranslations('common');

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const isAr = typeof document !== 'undefined' && document.documentElement.lang === 'ar';

  const services = [
    { key: 'has_catering' as const, label: tp('catering'), icon: UtensilsCrossed },
    { key: 'has_cleaning' as const, label: tp('cleaning'), icon: Sparkles },
    { key: 'has_maintenance' as const, label: tp('maintenance'), icon: Wrench },
    { key: 'has_transportation' as const, label: tp('transportation'), icon: Bus },
  ];

  const activeCount = [
    filters.area_direction,
    filters.room_type,
    filters.min_price,
    filters.max_price,
    filters.min_capacity,
    filters.has_catering,
    filters.has_cleaning,
    filters.has_maintenance,
    filters.has_transportation,
    filters.verified_only,
  ].filter((v) => v !== '' && v !== false).length;

  return (
    <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header with active count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#F15A29]" />
          <h2 className="text-lg font-semibold text-gray-900">{t('filters')}</h2>
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

      {/* Quality filters */}
      <div className="space-y-2 rounded-lg border border-[#FEF0E8] bg-[#FEF0E8]/30 p-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filters.verified_only}
            onChange={(e) => updateFilter('verified_only', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#F15A29] focus:ring-[#F15A29]"
          />
          <ShieldCheck className="h-4 w-4 text-[#F15A29]" />
          <span className="font-medium text-gray-700">موثق من المنصة فقط</span>
        </label>
      </div>

      {/* Area */}
      <Select
        label={t('area')}
        value={filters.area_direction}
        onChange={(e) => updateFilter('area_direction', e.target.value as AreaDirection | '')}
      >
        <option value="">{tc('all')}</option>
        <option value="north">{ta('north')}</option>
        <option value="south">{ta('south')}</option>
        <option value="east">{ta('east')}</option>
        <option value="west">{ta('west')}</option>
        <option value="central">{ta('central')}</option>
      </Select>

      {/* Room type */}
      <Select
        label={t('roomType')}
        value={filters.room_type}
        onChange={(e) => updateFilter('room_type', e.target.value as RoomType | '')}
      >
        <option value="">{tc('all')}</option>
        <option value="shared">{tr('shared')}</option>
        <option value="technician">{tr('technician')}</option>
        <option value="engineer">{tr('engineer')}</option>
        <option value="driver">{tr('driver')}</option>
      </Select>

      {/* Price range */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          نطاق السعر (ر.س / شهرياً)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="من"
            value={filters.min_price}
            onChange={(e) => updateFilter('min_price', e.target.value)}
            min={0}
          />
          <Input
            type="number"
            placeholder="إلى"
            value={filters.max_price}
            onChange={(e) => updateFilter('max_price', e.target.value)}
            min={0}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => updateFilter('max_price', preset.value)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                filters.max_price === preset.value
                  ? 'border-[#F15A29] bg-[#F15A29] text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#F15A29] hover:text-[#F15A29]'
              }`}
            >
              {isAr ? preset.label : preset.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Capacity */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t('minCapacity')}
        </label>
        <Input
          type="number"
          placeholder="0"
          icon={<Users className="h-4 w-4" />}
          value={filters.min_capacity}
          onChange={(e) => updateFilter('min_capacity', e.target.value)}
          min={0}
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {CAPACITY_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => updateFilter('min_capacity', preset.value)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                filters.min_capacity === preset.value
                  ? 'border-[#F15A29] bg-[#F15A29] text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#F15A29] hover:text-[#F15A29]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services as visual tiles */}
      <div>
        <span className="mb-2 block text-sm font-medium text-gray-700">
          {t('services')}
        </span>
        <div className="grid grid-cols-2 gap-2">
          {services.map(({ key, label, icon: Icon }) => {
            const active = filters[key] as boolean;
            return (
              <button
                key={key}
                type="button"
                onClick={() => updateFilter(key, !active)}
                className={`flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors ${
                  active
                    ? 'border-[#F15A29] bg-[#FEF0E8] text-[#F15A29] font-medium'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-[#F15A29]' : 'text-gray-400'}`} />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search button with result count */}
      <Button
        type="button"
        className="w-full bg-[#F15A29] hover:bg-[#D94C1E] text-white border-0"
        size="lg"
      >
        <Search className="h-4 w-4 me-2" />
        {resultsCount !== undefined
          ? t('resultsCount', { count: resultsCount })
          : tc('search')}
      </Button>
    </div>
  );
}
