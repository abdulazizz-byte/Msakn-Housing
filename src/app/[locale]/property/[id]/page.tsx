import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  Building2,
  Users,
  DoorOpen,
  BedDouble,
  UtensilsCrossed,
  Sparkles,
  Wrench,
  Bus,
  MapPin,
  ShieldCheck,
  FileText,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { sampleProperties } from '@/lib/sample-data';
import { getLocalizedField, formatPrice, getAreaLabel } from '@/lib/utils';
import { ImageGallery } from '@/components/properties/ImageGallery';
import { AmenitiesList } from '@/components/properties/AmenitiesList';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('property');
  const tc = await getTranslations('common');
  const ta = await getTranslations('areas');

  const isRTL = locale === 'ar';
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const property = sampleProperties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-20 text-center">
        <Building2 className="mx-auto h-16 w-16 text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {tc('noResults')}
        </h1>
        <Link
          href={`/${locale}/search`}
          className="mt-6 inline-flex items-center gap-2 text-[#F15A29] hover:text-[#D94C1E]"
        >
          <BackArrow className="h-4 w-4" />
          {tc('back')}
        </Link>
      </div>
    );
  }

  const title = getLocalizedField(property, 'title', locale);
  const description = getLocalizedField(property, 'description', locale);
  const district = getLocalizedField(property, 'district', locale);
  const areaLabel = getAreaLabel(property.area_direction, locale);

  const lowestPrice =
    property.price_shared ?? property.price_technician ?? property.price_engineer ?? property.price_driver ?? 0;

  const roomTypes = [
    {
      key: 'shared',
      available: property.has_shared_rooms,
      price: property.price_shared,
      label: t('sharedRoom'),
      icon: Users,
    },
    {
      key: 'technician',
      available: property.has_technician_rooms,
      price: property.price_technician,
      label: t('technicianRoom'),
      icon: BedDouble,
    },
    {
      key: 'engineer',
      available: property.has_engineer_rooms,
      price: property.price_engineer,
      label: t('engineerRoom'),
      icon: DoorOpen,
    },
    {
      key: 'driver',
      available: property.has_driver_rooms,
      price: property.price_driver,
      label: t('driverRoom'),
      icon: Bus,
    },
  ].filter((rt) => rt.available);

  const services = [
    {
      key: 'catering',
      available: property.has_catering,
      price: property.catering_price,
      label: t('catering'),
      icon: UtensilsCrossed,
    },
    {
      key: 'cleaning',
      available: property.has_cleaning,
      price: property.cleaning_price,
      label: t('cleaning'),
      icon: Sparkles,
    },
    {
      key: 'maintenance',
      available: property.has_maintenance,
      price: property.maintenance_price,
      label: t('maintenance'),
      icon: Wrench,
    },
    {
      key: 'transportation',
      available: property.has_transportation,
      price: property.transportation_price,
      label: t('transportation'),
      icon: Bus,
    },
  ];

  return (
    <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-6">
      {/* Back link */}
      <Link
        href={`/${locale}/search`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#F15A29]"
      >
        <BackArrow className="h-4 w-4" />
        {tc('back')}
      </Link>

      {/* ============================
          Image Gallery
          ============================ */}
      {property.images && property.images.length > 0 ? (
        <ImageGallery images={property.images} locale={locale} />
      ) : (
        <div className="mb-8">
          <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 sm:h-80 lg:h-96">
            <Building2 className="h-20 w-20 text-gray-400" />
          </div>
        </div>
      )}

      {/* ============================
          Title + Badges
          ============================ */}
      <div className="mb-6 flex flex-wrap items-start gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-gray-600">
            <MapPin className="h-4 w-4 shrink-0" />
            {district}, {areaLabel} {property.city}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge status={property.verification_status as 'verified' | 'pending' | 'unverified'}>
            <ShieldCheck className="me-1 h-3.5 w-3.5" />
            {property.verification_status === 'verified'
              ? t('verificationBadge')
              : tc(property.verification_status)}
          </Badge>
          {property.is_platform_managed && (
            <Badge status="platformManaged">
              {tc('platformManaged')}
            </Badge>
          )}
        </div>
      </div>

      {/* ============================
          Two-Column Layout
          ============================ */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ---------- Left Column ---------- */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('details')}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-gray-700">{description}</p>
            </CardContent>
          </Card>

          {/* Capacity Details */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('capacity')}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <Users className="mx-auto h-6 w-6 text-[#F15A29]" />
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {property.total_capacity}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('totalCapacity')}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <Users className="mx-auto h-6 w-6 text-[#F15A29]" />
                  <p className="mt-2 text-2xl font-bold text-[#F15A29]">
                    {property.available_capacity}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('availableCapacity')}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <DoorOpen className="mx-auto h-6 w-6 text-[#F15A29]" />
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {property.total_rooms}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('totalRooms')}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <BedDouble className="mx-auto h-6 w-6 text-[#F15A29]" />
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {property.workers_per_room}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('workersPerRoom')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Types Available */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('pricing')}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-100">
                {roomTypes.map((rt) => (
                  <div
                    key={rt.key}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEF0E8]">
                        <rt.icon className="h-5 w-5 text-[#F15A29]" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {rt.label}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(rt.price!, locale)}{' '}
                      <span className="text-sm font-normal text-gray-500">
                        / {tc('perWorker')} / {tc('perMonth')}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('services')}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((svc) => (
                  <div
                    key={svc.key}
                    className={`flex items-center gap-3 rounded-lg border p-4 ${
                      svc.available
                        ? 'border-red-200 bg-[#FEF0E8]/50'
                        : 'border-gray-200 bg-gray-50 opacity-50'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        svc.available ? 'bg-red-100' : 'bg-gray-200'
                      }`}
                    >
                      <svc.icon
                        className={`h-5 w-5 ${
                          svc.available ? 'text-[#F15A29]' : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">{svc.label}</p>
                      {svc.available ? (
                        <p className="text-sm text-[#D94C1E]">
                          {formatPrice(svc.price, locale)} / {tc('perWorker')} / {tc('perMonth')}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400">
                          {tc('noResults')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Amenities — 24 facilities */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {locale === 'ar' ? 'مرافق وخدمات مميزة' : 'Exceptional Facilities & Services'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {locale === 'ar' ? '24 مرفق متكامل' : '24 integrated facilities'}
              </p>
            </CardHeader>
            <CardContent>
              <AmenitiesList locale={locale} />
            </CardContent>
          </Card>

          {/* Complex Specifications */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {locale === 'ar' ? 'مواصفات المجمع السكني' : 'Complex Specifications'}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-[#1a1a1a] p-4 text-center text-white">
                  <p className="text-3xl font-bold text-[#F15A29]">20,640</p>
                  <p className="mt-1 text-xs text-gray-300">
                    {locale === 'ar' ? 'متر مربع' : 'Square Meters'}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {locale === 'ar' ? 'المساحة الإجمالية' : 'Total Area'}
                  </p>
                </div>
                <div className="rounded-lg bg-[#1a1a1a] p-4 text-center text-white">
                  <p className="text-3xl font-bold text-[#F15A29]">20</p>
                  <p className="mt-1 text-xs text-gray-300">
                    {locale === 'ar' ? 'دورين' : '2 Floors'}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {locale === 'ar' ? 'عدد المباني' : 'Buildings'}
                  </p>
                </div>
                <div className="rounded-lg bg-[#1a1a1a] p-4 text-center text-white">
                  <p className="text-3xl font-bold text-[#F15A29]">592</p>
                  <p className="mt-1 text-xs text-gray-300">
                    {locale === 'ar' ? '24 م² للغرفة' : '24 m² per room'}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {locale === 'ar' ? 'عدد الغرف' : 'Rooms'}
                  </p>
                </div>
                <div className="rounded-lg bg-[#1a1a1a] p-4 text-center text-white">
                  <p className="text-3xl font-bold text-[#F15A29]">3,500</p>
                  <p className="mt-1 text-xs text-gray-300">
                    {locale === 'ar' ? 'سرير' : 'Beds'}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {locale === 'ar' ? 'عدد الأسرة' : 'Capacity'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sustainability */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {locale === 'ar' ? 'الاستدامة' : 'Sustainability'}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {(locale === 'ar'
                  ? [
                      'تشجير المساحات الخارجية',
                      'أنظمة معالجة وتكرير المياه',
                      'أنظمة طاقة شمسية متواكبة مع أحدث الاشتراطات البيئية',
                      'الاعتماد على موارد ذاتية (ماء، كهرباء، زراعة)',
                    ]
                  : [
                      'Landscaping of outdoor spaces',
                      'Water treatment and recycling systems',
                      'Solar energy systems compliant with latest regulations',
                      'Self-sufficient resources (water, electricity, agriculture)',
                    ]
                ).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#F15A29]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security & Safety */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {locale === 'ar' ? 'الأمن والسلامة' : 'Security & Safety'}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FEF0E8]">
                    <ShieldCheck className="h-5 w-5 text-[#F15A29]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {locale === 'ar' ? 'تصميم آمن' : 'Safe Design'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {locale === 'ar'
                        ? 'يتناسب مع اشتراطات الدفاع المدني وأنظمة السلامة الحديثة'
                        : 'Compliant with civil defense requirements and modern safety systems'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FEF0E8]">
                    <ShieldCheck className="h-5 w-5 text-[#F15A29]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {locale === 'ar' ? 'نظام كشف الحريق' : 'Fire Detection System'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {locale === 'ar'
                        ? 'نظام إنذار صوتي وشبكة كشف الدخان وأنظمة رش آلي'
                        : 'Audio alarm, smoke detection network, and automatic sprinkler systems'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FEF0E8]">
                    <ShieldCheck className="h-5 w-5 text-[#F15A29]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {locale === 'ar' ? 'كاميرات مراقبة' : 'Surveillance Cameras'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {locale === 'ar'
                        ? 'تغطية لكامل الموقع مع غرفة تحكم وشركة أمن متخصصة'
                        : 'Full site coverage with control room and dedicated security company'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* License Info */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                {t('license')}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {property.license_number && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 shrink-0 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t('license')}</p>
                      <p className="font-medium text-gray-900">
                        {property.license_number}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {property.municipality_approved ? (
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 shrink-0 text-red-400" />
                  )}
                  <p className="font-medium text-gray-900">
                    {property.municipality_approved
                      ? tc('verified')
                      : tc('unverified')}
                    {' - Municipality Approval'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ---------- Right Column ---------- */}
        <div className="lg:w-[420px] xl:w-[460px] lg:shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Pricing Summary */}
            <Card>
              <CardHeader>
                <p className="text-sm text-gray-500">{t('pricing')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatPrice(lowestPrice, locale)}
                  <span className="text-base font-normal text-gray-500">
                    {' '}
                    / {tc('perWorker')} / {tc('perMonth')}
                  </span>
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  {t('bookNow')}
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  {t('contactProvider')}
                </Button>
              </CardContent>
              <CardFooter>
                <p className="text-center text-xs text-gray-400 w-full">
                  {tc('sar')} &middot; {tc('perMonth')}
                </p>
              </CardFooter>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('location')}
                </h2>
              </CardHeader>
              <CardContent>
                {property.latitude && property.longitude ? (
                  <div className="overflow-hidden rounded-lg">
                    <iframe
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${property.latitude},${property.longitude}&zoom=16`}
                    />
                    <a
                      href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=17`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-1.5 text-sm text-[#F15A29] hover:underline"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {locale === 'ar' ? 'افتح في خرائط قوقل' : 'Open in Google Maps'}
                    </a>
                  </div>
                ) : (
                  <div className="flex h-48 flex-col items-center justify-center rounded-lg bg-gray-100">
                    <MapPin className="h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      {district}, {areaLabel} {property.city}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
