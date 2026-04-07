'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  price: number;
  id?: string;
}

interface PropertyMapProps {
  markers: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onMarkerClick?: (marker: MapMarker) => void;
}

const RIYADH_CENTER = { lat: 24.7136, lng: 46.6753 };

export function PropertyMap({
  markers,
  center,
  zoom = 15,
  onMarkerClick,
}: PropertyMapProps) {
  const t = useTranslations('search');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const gMarkersRef = useRef<google.maps.Marker[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const onMarkerClickRef = useRef(onMarkerClick);
  onMarkerClickRef.current = onMarkerClick;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const initialCenter = markers.length > 0
    ? { lat: markers[0].lat, lng: markers[0].lng }
    : center || RIYADH_CENTER;

  useEffect(() => {
    if (!apiKey || apiKey === 'your-google-maps-key') {
      setError('Google Maps API key not configured');
      setLoading(false);
      return;
    }

    setOptions({ key: apiKey, v: 'weekly' });

    importLibrary('maps')
      .then(({ Map }: google.maps.MapsLibrary) => {
        if (!mapRef.current) return;

        const map = new Map(mapRef.current, {
          center: initialCenter,
          zoom,
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: true,
          mapTypeControl: false,
        });

        mapInstanceRef.current = map;
        setLoading(false);
        setMapReady(true);
      })
      .catch(() => {
        setError('Failed to load Google Maps');
        setLoading(false);
      });

    return () => {
      gMarkersRef.current.forEach((m) => m.setMap(null));
      gMarkersRef.current = [];
      mapInstanceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  // Add markers once map is ready
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !markers.length) return;

    const map = mapInstanceRef.current;

    // Clear old markers
    gMarkersRef.current.forEach((m) => m.setMap(null));
    gMarkersRef.current = [];

    const bounds = new google.maps.LatLngBounds();

    markers.forEach((markerData) => {
      const position = { lat: markerData.lat, lng: markerData.lng };

      // Simple red default marker
      const marker = new google.maps.Marker({
        map,
        position,
        title: markerData.title,
      });

      // Info window - open immediately
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding:8px;min-width:160px;font-family:sans-serif;text-align:center">
            <strong style="font-size:15px;display:block;margin-bottom:4px">${markerData.title}</strong>
            <span style="color:#dc2626;font-weight:700;font-size:18px">${markerData.price} ر.س</span>
            <span style="color:#666;font-size:12px;display:block">/ شهرياً</span>
          </div>
        `,
      });
      infoWindow.open(map, marker);

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        onMarkerClickRef.current?.(markerData);
      });

      gMarkersRef.current.push(marker);
      bounds.extend(position);
    });

    if (markers.length === 1) {
      map.setCenter(markers[0]);
      map.setZoom(15);
    } else {
      map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
    }
  }, [mapReady, markers]);

  if (error) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 p-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <MapPin className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="mb-1 text-lg font-semibold text-gray-700">
          {t('mapView')}
        </h3>
        <p className="mb-4 text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[400px] overflow-hidden rounded-xl border border-gray-200">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-600" />
            <span className="text-sm text-gray-500">Loading map...</span>
          </div>
        </div>
      )}
      <div ref={mapRef} className="h-full min-h-[400px] w-full" />
    </div>
  );
}
