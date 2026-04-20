'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ClipboardList,
  Building2,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { sampleProperties, sampleRequests } from '@/lib/sample-data';
import { getLocalizedField, formatPrice } from '@/lib/utils';
import type { Property } from '@/types';

type Tab = 'overview' | 'properties' | 'requests' | 'users';

const verificationBadgeMap: Record<string, 'verified' | 'pending' | 'unverified'> = {
  verified: 'verified',
  pending: 'pending',
  unverified: 'unverified',
  rejected: 'unverified',
};

const statusBadgeMap: Record<string, 'verified' | 'pending' | 'unverified' | 'platformManaged'> = {
  active: 'verified',
  draft: 'unverified',
  paused: 'pending',
  archived: 'unverified',
  open: 'verified',
  matched: 'platformManaged',
  closed: 'unverified',
  cancelled: 'unverified',
};

const sampleActivity = [
  { id: 1, text: 'Property verified: Masakin Complex', textAr: 'تم توثيق العقار: مجمع مساكن', time: '15 min ago', timeAr: 'منذ 15 دقيقة', icon: 'verify' },
];

const sampleUsers = [
  { id: '1', name: 'Ahmad Alkasabi', nameAr: 'أحمد القصبي', email: 'aalkasabi@msakn.sa', role: 'admin' as const, joined: '2025-09-01', active: true },
];

const roleBadgeMap: Record<string, 'verified' | 'pending' | 'platformManaged'> = {
  admin: 'platformManaged',
  provider: 'verified',
  company: 'pending',
};

export default function AdminPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const t = useTranslations('admin');
  const tc = useTranslations('common');

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [properties, setProperties] = useState<Property[]>(sampleProperties);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: t('overview') },
    { key: 'properties', label: t('properties') },
    { key: 'requests', label: t('requests') },
    { key: 'users', label: t('users') },
  ];

  const kpis = [
    { label: t('totalRequests'), value: '156', icon: ClipboardList },
    { label: t('activeListings'), value: '48', icon: Building2 },
    { label: t('conversionRate'), value: '34%', icon: TrendingUp },
    { label: t('revenue'), value: `${tc('sar')} 2.4M`, icon: DollarSign },
  ];

  const handleVerify = (propertyId: string) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId ? { ...p, verification_status: 'verified' as const } : p
      )
    );
  };

  const handleReject = (propertyId: string) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId ? { ...p, verification_status: 'rejected' as const } : p
      )
    );
  };

  const activityIcon = (type: string) => {
    switch (type) {
      case 'request': return <ClipboardList className="h-4 w-4 text-[#F15A29]" />;
      case 'verify': return <CheckCircle className="h-4 w-4 text-[#F15A29]" />;
      case 'user': return <Users className="h-4 w-4 text-purple-500" />;
      case 'booking': return <ShieldCheck className="h-4 w-4 text-[#F15A29]" />;
      case 'expired': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  // Chart bar heights for the mockup
  const chartBars = [40, 65, 55, 80, 72, 90, 60, 85, 75, 95, 68, 88];
  const chartMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
      {/* Title */}
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        {t('title')}
      </h1>

      {/* KPI Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="flex items-center gap-4 py-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-100 text-[#F15A29]">
                <kpi.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-1 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('recentActivity')}
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    {activityIcon(item.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-900">
                      {locale === 'ar' ? item.textAr : item.text}
                    </p>
                    <p className="text-xs text-gray-500">
                      {locale === 'ar' ? item.timeAr : item.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chart Placeholder */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('analytics')}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-500">
                {t('requests')} / {locale === 'ar' ? 'شهري' : 'Monthly'}
              </p>
              <div className="flex items-end gap-2" style={{ height: 180 }}>
                {chartBars.map((height, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-[#F15A29] transition-all hover:bg-[#F15A29]"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-gray-400">
                      {chartMonths[i]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === 'properties' && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('propertyName')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('owner')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('district')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('capacity')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('status')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('verification')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                        {getLocalizedField(property, 'title', locale)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {property.owner_id.slice(0, 8)}...
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {getLocalizedField(property, 'district', locale)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {property.available_capacity} / {property.total_capacity}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Badge status={statusBadgeMap[property.status]}>
                          {property.status}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Badge status={verificationBadgeMap[property.verification_status]}>
                          {property.verification_status}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {(property.verification_status === 'unverified' ||
                          property.verification_status === 'pending') && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleVerify(property.id)}
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              {t('verify')}
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleReject(property.id)}
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              {t('reject')}
                            </Button>
                          </div>
                        )}
                        {property.verification_status === 'verified' && (
                          <span className="text-sm text-gray-400">--</span>
                        )}
                        {property.verification_status === 'rejected' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerify(property.id)}
                          >
                            {t('verify')}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('company')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('workersCount')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('area')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('roomType')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('status')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('date')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                        {request.company_id.slice(0, 8)}...
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {request.worker_count}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {request.city}
                        {request.area_direction && ` - ${request.area_direction}`}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {request.room_type}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Badge status={statusBadgeMap[request.status]}>
                          {request.status}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {new Date(request.created_at).toLocaleDateString(
                          locale === 'ar' ? 'ar-SA' : 'en-US'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('name')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('email')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('role')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('joined')}
                    </th>
                    <th className="whitespace-nowrap px-4 py-3 text-start font-medium text-gray-600">
                      {t('status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                        {locale === 'ar' ? user.nameAr : user.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Badge status={roleBadgeMap[user.role]}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {new Date(user.joined).toLocaleDateString(
                          locale === 'ar' ? 'ar-SA' : 'en-US'
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Badge status={user.active ? 'verified' : 'unverified'}>
                          {user.active ? t('active') : tc('noResults')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
