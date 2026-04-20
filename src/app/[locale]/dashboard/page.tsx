'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ClipboardList,
  FileText,
  BookOpen,
  Users,
  MapPin,
  Calendar,
  Star,
  Inbox,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { sampleRequests } from '@/lib/sample-data';
import type { HousingRequest } from '@/types';

type Tab = 'requests' | 'offers' | 'bookings';

const statusToBadge: Record<string, 'verified' | 'pending' | 'unverified' | 'platformManaged'> = {
  open: 'verified',
  matched: 'platformManaged',
  closed: 'unverified',
  cancelled: 'unverified',
  pending: 'pending',
  accepted: 'verified',
  rejected: 'unverified',
};

const sampleOffers: {
  id: string;
  propertyName: string;
  propertyNameAr: string;
  pricePerWorker: number;
  matchScore: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}[] = [];

export default function DashboardPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const t = useTranslations('dashboard');
  const tc = useTranslations('common');
  const to = useTranslations('offers');
  const ta = useTranslations('areas');
  const tr = useTranslations('roomTypes');

  const [activeTab, setActiveTab] = useState<Tab>('requests');

  const activeRequests = sampleRequests.filter((r) => r.status === 'open').length;
  const pendingOffers = sampleOffers.filter((o) => o.status === 'pending').length;
  const totalBookings = 0;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'requests', label: t('myRequests'), icon: <ClipboardList className="h-4 w-4" /> },
    { key: 'offers', label: t('myOffers'), icon: <FileText className="h-4 w-4" /> },
    { key: 'bookings', label: t('myBookings'), icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
      {/* Title */}
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        {t('title')}
      </h1>

      {/* Stats cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 py-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-100 text-[#F15A29]">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('activeRequests')}</p>
              <p className="text-2xl font-bold text-gray-900">{activeRequests}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('pendingOffers')}</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOffers}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-100 text-[#F15A29]">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('totalBookings')}</p>
              <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab navigation */}
      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {sampleRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              locale={locale}
              ta={ta}
              tr={tr}
              tc={tc}
            />
          ))}
        </div>
      )}

      {activeTab === 'offers' && (
        <div className="space-y-4">
          {sampleOffers.map((offer) => (
            <Card key={offer.id} hoverable>
              <CardContent className="py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="truncate text-base font-semibold text-gray-900">
                        {locale === 'ar' ? offer.propertyNameAr : offer.propertyName}
                      </h3>
                      <Badge status={statusToBadge[offer.status]}>
                        {offer.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                      <span>{to('pricePerWorker')}: {offer.pricePerWorker} {tc('sar')}</span>
                      <span>{to('matchScore')}: {offer.matchScore}%</span>
                    </div>
                    {/* Match score bar */}
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-[#F15A29] transition-all"
                          style={{ width: `${offer.matchScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {offer.matchScore}%
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {offer.status === 'pending' && (
                      <>
                        <Button size="sm" variant="primary">
                          {to('accept')}
                        </Button>
                        <Button size="sm" variant="outline">
                          {to('reject')}
                        </Button>
                      </>
                    )}
                    {offer.status === 'accepted' && (
                      <Button size="sm" variant="outline">
                        {tc('view')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'bookings' && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <Inbox className="h-12 w-12 text-gray-300" />
            <p className="text-lg font-medium text-gray-500">
              {tc('noResults')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ─── Request card sub-component ─── */

function RequestCard({
  request,
  locale,
  ta,
  tr,
  tc,
}: {
  request: HousingRequest;
  locale: string;
  ta: ReturnType<typeof useTranslations>;
  tr: ReturnType<typeof useTranslations>;
  tc: ReturnType<typeof useTranslations>;
}) {
  return (
    <Card hoverable>
      <CardContent className="py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-semibold text-gray-900">
                {request.worker_count} {tc('workers')}
              </h3>
              <Badge status={statusToBadge[request.status]}>
                {request.status}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {request.city}
                {request.area_direction && ` - ${ta(request.area_direction)}`}
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {tr(request.room_type)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(request.move_in_date).toLocaleDateString(
                  locale === 'ar' ? 'ar-SA' : 'en-US',
                )}
              </span>
            </div>
            {request.max_budget_per_worker && (
              <p className="text-sm text-gray-500">
                {request.max_budget_per_worker} {tc('sar')} / {tc('perWorker')}
              </p>
            )}
          </div>
          <div className="flex shrink-0">
            <Button size="sm" variant="outline">
              {tc('view')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
