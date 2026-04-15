'use client';

import { useTranslations } from 'next-intl';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Users, Search, Filter } from 'lucide-react';
import type { AreaDirection, RoomType } from '@/types';

export interface FilterState {
  area_direction: AreaDirection | '';
  room_type: RoomType | '';
  max_price: string;
  min_capacity: string;
  has_catering: boolean;
  has_cleaning: boolean;
  has_maintenance: boolean;
  has_transportation: boolean;
}

interface SearchFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  resultsCount?: number;
}

export function SearchFilters({ filters, onChange, onClear, resultsCount }: SearchFiltersProps) {
  const t = useTranslations('search');
  const ta = useTranslations('areas');
  const tr = useTranslations('roomTypes');
  const tp = useTranslations('property');
  const tc = useTranslations('common');

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const services: { key: keyof FilterState; label: string }[] = [
    { key: 'has_catering', label: tp('catering') },
    { key: 'has_cleaning', label: tp('cleaning') },
    { key: 'has_maintenance', label: tp('maintenance') },
    { key: 'has_transportation', label: tp('transportation') },
  ];

  // Count active filters
  const activeCount = [
    filters.area_direction,
    filters.room_type,
    filters.max_price,
    filters.min_capacity,
    filters.has_catering,
    filters.has_cleaning,
    filters.has_maintenance,
    filters.has_transportation,
  ].filter((v) => v !== '' && v !== false).length;

  return (
    <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header with active count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#c41e3a]" />
          <h2 className="text-lg font-semibold text-gray-900">{t('filters')}</h2>
          {activeCount > 0 && (
            <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#c41e3a] px-1.5 text-[11px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-[#c41e3a] hover:underline"
          >
            {t('clearFilters')}
          </button>
        )}
      </div>

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

      <Input
        label={t('maxPrice')}
        type="number"
        placeholder="0"
        icon={<span className="text-xs font-semibold">ر.س</span>}
        value={filters.max_price}
        onChange={(e) => updateFilter('max_price', e.target.value)}
        min={0}
      />

      <Input
        label={t('minCapacity')}
        type="number"
        placeholder="0"
        icon={<Users className="h-4 w-4" />}
        value={filters.min_capacity}
        onChange={(e) => updateFilter('min_capacity', e.target.value)}
        min={0}
      />

      <div>
        <span className="mb-2 block text-sm font-medium text-gray-700">
          {t('services')}
        </span>
        <div className="space-y-2">
          {services.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={filters[key] as boolean}
                onChange={(e) => updateFilter(key, e.target.checked as FilterState[typeof key])}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Apply / Search button with result count */}
      <Button
        type="button"
        className="w-full bg-[#c41e3a] hover:bg-[#a91b32] text-white border-0"
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
