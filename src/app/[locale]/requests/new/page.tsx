'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Users, MapPin, Calendar, DollarSign, CheckCircle, ClipboardList } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import type { AreaDirection, RoomType } from '@/types';

export default function NewRequestPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const t = useTranslations('request');
  const tc = useTranslations('common');
  const ta = useTranslations('areas');
  const tr = useTranslations('roomTypes');
  const tp = useTranslations('property');

  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [workerCount, setWorkerCount] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [areaDirection, setAreaDirection] = useState<AreaDirection | ''>('');
  const [contractDuration, setContractDuration] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [roomType, setRoomType] = useState<RoomType | ''>('');
  const [budget, setBudget] = useState('');
  const [needsCatering, setNeedsCatering] = useState(false);
  const [needsCleaning, setNeedsCleaning] = useState(false);
  const [needsMaintenance, setNeedsMaintenance] = useState(false);
  const [needsTransportation, setNeedsTransportation] = useState(false);
  const [specialRequirements, setSpecialRequirements] = useState('');

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
                  {locale === 'ar' ? 'الرياض' : 'Riyadh'}
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

            {/* Row 2: Duration, Move-in, Room type, Budget */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              </Select>
              <Input
                label={t('budget')}
                type="number"
                min={0}
                icon={<DollarSign className="h-4 w-4" />}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={`${tc('sar')} / ${tc('perMonth')}`}
              />
            </div>

            {/* Services */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                {t('services')}
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
                    checked={needsCleaning}
                    onChange={(e) => setNeedsCleaning(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]"
                  />
                  {tp('cleaning')}
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm cursor-pointer hover:bg-gray-50 has-[:checked]:border-[#c41e3a] has-[:checked]:bg-[#fef2f2]">
                  <input
                    type="checkbox"
                    checked={needsMaintenance}
                    onChange={(e) => setNeedsMaintenance(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#c41e3a] focus:ring-[#c41e3a]"
                  />
                  {tp('maintenance')}
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
