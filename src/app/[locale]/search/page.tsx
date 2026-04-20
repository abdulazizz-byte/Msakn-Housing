'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { sampleProperties } from '@/lib/sample-data';
import { SearchFilters, type FilterState } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { PropertyMap, type MapMarker } from '@/components/properties/PropertyMap';
import type { Property } from '@/types';

const defaultFilters: FilterState = {
  area_direction: '',
  room_type: '',
  service_package: '',
  min_capacity: '',
  verified_only: false,
};

export default function SearchPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('search');

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('price');

  const filteredProperties = useMemo(() => {
    let results = sampleProperties.filter((p) => p.status === 'active');

    // Area direction
    if (filters.area_direction) {
      results = results.filter((p) => p.area_direction === filters.area_direction);
    }

    // Room type
    if (filters.room_type) {
      results = results.filter((p) => {
        if (filters.room_type === 'shared') return p.has_shared_rooms;
        if (filters.room_type === 'technician') return p.has_technician_rooms;
        if (filters.room_type === 'engineer') return p.has_engineer_rooms;
        if (filters.room_type === 'driver') return p.has_driver_rooms;
        return true;
      });
    }

    // Min capacity
    if (filters.min_capacity) {
      const minCap = Number(filters.min_capacity);
      results = results.filter((p) => p.available_capacity >= minCap);
    }

    // Service package — maps to service-flag combinations
    if (filters.service_package === 'housing-operated') {
      results = results.filter((p) => p.has_cleaning && p.has_maintenance);
    } else if (filters.service_package === 'housing-operated-catered') {
      results = results.filter((p) => p.has_cleaning && p.has_maintenance && p.has_catering);
    }

    // Quality filters
    if (filters.verified_only) results = results.filter((p) => p.verification_status === 'verified');

    // Sort
    results.sort((a, b) => {
      if (sortBy === 'price') {
        const priceA = a.price_shared ?? a.price_technician ?? a.price_engineer ?? 0;
        const priceB = b.price_shared ?? b.price_technician ?? b.price_engineer ?? 0;
        return priceA - priceB;
      }
      if (sortBy === 'capacity') {
        return b.available_capacity - a.available_capacity;
      }
      return 0;
    });

    return results;
  }, [filters, sortBy]);

  const mapMarkers: MapMarker[] = useMemo(
    () =>
      filteredProperties
        .filter((p) => p.latitude != null && p.longitude != null)
        .map((p) => ({
          lat: p.latitude!,
          lng: p.longitude!,
          title: locale === 'ar' && p.title_ar ? p.title_ar : p.title,
          price: p.price_shared ?? p.price_technician ?? p.price_engineer ?? 0,
        })),
    [filteredProperties, locale],
  );

  return (
    <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
      {/* Page title */}
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        {t('title')}
      </h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left column: Map (hidden on mobile) */}
        <div className="hidden lg:block lg:w-1/2 lg:shrink-0">
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            <PropertyMap markers={mapMarkers} />
          </div>
        </div>

        {/* Right column: Filters + Results */}
        <div className="flex-1 min-w-0 space-y-6">
          <SearchFilters
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters(defaultFilters)}
            resultsCount={filteredProperties.length}
          />
          <SearchResults
            properties={filteredProperties}
            locale={locale}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>
    </div>
  );
}
