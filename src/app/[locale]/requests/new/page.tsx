'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Users, MapPin, Calendar, CheckCircle, ClipboardList, Building2, Phone, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import type { AreaDirection, RoomType } from '@/types';

// Price prediction based on location, room type, and services
function predictBudget(
  area: AreaDirection | '',
  roomType: RoomType | '',
  workerCount: number,
): number {
  // Base prices by room type
  const basePrices: Record<string, number> = {
    shared: 650,
    technician: 1200,
    engineer: 2400,
    driver: 550,
    '': 700,
  };

  // Area multipliers
  const areaMultipliers: Record<string, number> = {
    north: 1.15,
    south: 0.90,
    east: 1.0,
    west: 0.95,
    central: 1.20,
    '': 1.0,
  };

  // Volume discount
  let volumeDiscount = 1.0;
  if (workerCount >= 500) volumeDiscount = 0.85;
  else if (workerCount >= 200) volumeDiscount = 0.90;
  else if (workerCount >= 100) volumeDiscount = 0.95;

  const base = basePrices[roomType] || 700;
  const multiplier = areaMultipliers[area] || 1.0;

  return Math.round(base * multiplier * volumeDiscount);
}

export default function NewRequestPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const isAr = locale === 'ar';

  const t = useTranslations('request');
  const tc = useTranslations('common');
  const ta = useTranslations('areas');
  const tr = useTranslations('roomTypes');
  const tp = useTranslations('property');

  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [workerCount, setWorkerCount] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [areaDirection, setAreaDirection] = useState<AreaDirection | ''>('');
  const [contractDuration, setContractDuration] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [roomType, setRoomType] = useState<RoomType | ''>('');

  // Core services — always ON
  const [needsOperations, setNeedsOperations] = useState(true);
  const [needsCleaning, setNeedsCleaning] = useState(true);
  const [needsMaintenance, setNeedsMaintenance] = useState(true);

  // Side services — OFF by default
  const [needsCatering, setNeedsCatering] = useState(false);
  const [needsTransportation, setNeedsTransportation] = useState(false);
  const [needsLaundry, setNeedsLaundry] = useState(false);
  const [needsClinic, setNeedsClinic] = useState(false);

  const [specialRequirements, setSpecialRequirements] = useState('');

  // Predicted budget
  const predictedBudget = useMemo(
    () => predictBudget(areaDirection, roomType, Number(workerCount) || 0),
    [areaDirection, roomType, workerCount]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-16 max-w-4xl">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <CheckCircle className="h-16 w-16 text-[#c41e3a]" />
            <h2 className="text-2xl font-bold text-gray-900">
              {t('submitSuccess')}
            </h2>
            <p className="text-gray-600">
              {t('submitSuccessDesc')}
            </p>
            <Button
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="mt-4"
            >
              {tc('back')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {t('title')}
        </h1>
        <p className="mt-2 text-gray-600">{t('subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-[#c41e3a]" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('title')}
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 0: Company name & Contact */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={isAr ? 'اسم الشركة' : 'Company Name'}
                required
                icon={<Building2 className="h-4 w-4" />}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={isAr ? 'مثال: شركة البناء المتقدمة' : 'e.g. Advanced Construction Co.'}
              />
              <Input
                label={isAr ? 'رقم التواصل' : 'Contact Number'}
                type="tel"
                required
                icon={<Phone className="h-4 w-4" />}
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+966 5X XXX XXXX"
              />
            </div>

            {/* Row 1: Worker count, City, Area */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label={t('workerCount')}
                type="number"
                min={1}
                required
                icon={<Users className="h-4 w-4" />}
                value={workerCount}
                onChange={(e) => setWorkerCount(e.target.value)}
                placeholder="e.g. 50"
              />
              <Select
                label={t('city')}
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Riyadh">
                  {isAr ? 'الرياض' : 'Riyadh'}
                </option>
              </Select>
              <Select
                label={t('area')}
                required
                value={areaDirection}
                onChange={(e) => setAreaDirection(e.target.value as AreaDirection)}
              >
                <option value="">{tc('all')}</option>
                <option value="north">{ta('north')}</option>
                <option value="south">{ta('south')}</option>
                <option value="east">{ta('east')}</option>
                <option value="west">{ta('west')}</option>
                <option value="central">{ta('central')}</option>
              </Select>
            </div>

            {/* Row 2: Duration, Move-in, Room type */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Input
                label={t('contractDuration')}
                type="number"
                min={1}
                required
                icon={<Calendar className="h-4 w-4" />}
                value={contractDuration}
                onChange={(e) => setContractDuration(e.target.value)}
                placeholder="e.g. 12"
              />
              <Input
                label={t('moveInDate')}
                type="date"
                required
                icon={<Calendar className="h-4 w-4" />}
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
              />
              <Select
                label={t('roomType')}
                required
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as RoomType)}
              >
                <option value="">{tc('all')}</option>
                <option value="shared">{tr('shared')}</option>
                <option value="technician">{tr('technician')}</option>
                <option value="engineer">{tr('engineer')}</option>
                <option value="driver">{tr('driver')}</option>
              </Select>
            </div>

            {/* Predicted Budget */}
            <div className="rounded-xl border border-[#c41e3a]/20 bg-[#fef2f2] p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-[#c41e3a]" />
                <span className="text-sm font-medium text-[#c41e3a]">
                  {isAr ? 'السعر المتوقع' : 'Estimated Price'}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#c41e3a]">
                  {predictedBudget}
                </span>
                <span className="text-sm text-[#c41e3a]/70">
                  {tc('sar')} / {tc('perWorker')} / {tc('perMonth')}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#c41e3a]/60">
                {isAr
                  ? 'تقدير بناءً على الموقع ونوع الغرفة وعدد الافراد'
                  : 'Based on location, room type, and number of individuals'}
              </p>
            </div>

            {/* Core Services — always ticked */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                {isAr ? 'الخدمات الأساسية' : 'Core Services'}
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <label className="flex items-center gap-2 rounded-lg border border-[#c41e3a] bg-[#fef2f2] p-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needsOperations}
                    onChange={(e) => setNeedsOperations(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]"
                  />
                  {isAr ? 'التشغيل' : 'Operations'}
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-[#c41e3a] bg-[#fef2f2] p-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needsCleaning}
                    onChange={(e) => setNeedsCleaning(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]"
                  />
                  {tp('cleaning')}
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-[#c41e3a] bg-[#fef2f2] p-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needsMaintenance}
                    onChange={(e) => setNeedsMaintenance(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]"
                  />
                  {tp('maintenance')}
                </label>
              </div>
            </div>

            {/* Side Services — not ticked by default */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                {isAr ? 'الخدمات الجانبية' : 'Additional Services'}
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <label className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-[#c41e3a] has-[:checked]:bg-[#fef2f2]">
                  <input
                    type="checkbox"
                    checked={needsCatering}
                    onChange={(e) => setNeedsCatering(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]"
                  />
                  {tp('catering')}
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-[#c41e3a] has-[:checked]:bg-[#fef2f2]">
                  <input
                    type="checkbox"
                    checked={needsTransportation}
                    onChange={(e) => setNeedsTransportation(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]"
                  />
                  {tp('transportation')}
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-[#c41e3a] has-[:checked]:bg-[#fef2f2]">
                  <input
                    type="checkbox"
                    checked={needsLaundry}
                    onChange={(e) => setNeedsLaundry(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]"
                  />
                  {isAr ? 'غسيل' : 'Laundry'}
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-[#c41e3a] has-[:checked]:bg-[#fef2f2]">
                  <input
                    type="checkbox"
                    checked={needsClinic}
                    onChange={(e) => setNeedsClinic(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]"
                  />
                  {isAr ? 'عيادة طبية' : 'Medical Clinic'}
                </label>
              </div>
            </div>

            {/* Special requirements */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                {t('specialRequirements')}
              </label>
              <textarea
                rows={4}
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder={isAr
                  ? 'مثال: أريد غرفة للجنسية الفلبينية'
                  : 'e.g. I need rooms for Filipino workers'}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#c41e3a] focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/20"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline">
                {tc('cancel')}
              </Button>
              <Button type="submit" size="lg">
                {tc('submit')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
