import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, locale: string = 'ar-SA'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number, locale: string = 'ar-SA'): string {
  return new Intl.NumberFormat(locale).format(num);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getLocalizedField(obj: any, field: string, locale: string): string {
  if (locale === 'ar' && obj[`${field}_ar`]) {
    return obj[`${field}_ar`] as string;
  }
  return (obj[field] as string) || '';
}

export function getRoomTypeLabel(type: string, locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    shared: { en: 'Shared Workers', ar: 'افراد مشتركين' },
    technician: { en: 'Technicians (2/room)', ar: 'فنيين (2/غرفة)' },
    engineer: { en: 'Engineers (Private)', ar: 'مهندسين (خاصة)' },
    driver: { en: 'Drivers', ar: 'سائقين' },
  };
  return labels[type]?.[locale] || type;
}

export function getAreaLabel(area: string, locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    north: { en: 'North', ar: 'شمال' },
    south: { en: 'South', ar: 'جنوب' },
    east: { en: 'East', ar: 'شرق' },
    west: { en: 'West', ar: 'غرب' },
    central: { en: 'Central', ar: 'وسط' },
  };
  return labels[area]?.[locale] || area;
}
