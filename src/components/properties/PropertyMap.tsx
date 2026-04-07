'use client';

import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  price: number;
}

interface PropertyMapProps {
  markers: MapMarker[];
}

export function PropertyMap({ markers }: PropertyMapProps) {
  const t = useTranslations('search');

  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <MapPin className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-gray-700">
        {t('mapView')}
      </h3>
      <p className="mb-4 text-sm text-gray-500">
        Google Maps integration
      </p>
      {markers.length > 0 && (
        <p className="text-xs text-gray-400">
          {markers.length} {markers.length === 1 ? 'marker' : 'markers'}
        </p>
      )}
    </div>
  );
}
