'use client';

import { useTranslations } from 'next-intl';
import { List, Map as MapIcon } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import { PropertyCard } from '@/components/properties/PropertyCard';
import type { Property } from '@/types';

interface SearchResultsProps {
  properties: Property[];
  locale: string;
  viewMode: 'list' | 'map';
  onViewModeChange: (mode: 'list' | 'map') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function SearchResults({
  properties,
  locale,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}: SearchResultsProps) {
  const t = useTranslations('search');
  const tc = useTranslations('common');

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-gray-600">
          {t('resultsCount', { count: properties.length })}
        </p>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="w-40">
            <Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label={t('sortBy')}
            >
              <option value="price">{t('sortPrice')}</option>
              <option value="capacity">{t('sortCapacity')}</option>
            </Select>
          </div>

          {/* View toggle */}
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              aria-label={t('listView')}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              className={`p-2 transition-colors ${
                viewMode === 'map'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              aria-label={t('mapView')}
            >
              <MapIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results grid */}
      {properties.length === 0 ? (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16">
          <p className="text-gray-500">{tc('noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
