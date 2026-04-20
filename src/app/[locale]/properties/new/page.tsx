'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Building2,
  MapPin,
  Ruler,
  FileText,
  Shield,
  Construction,
  FileSignature,
  CheckCircle,
  ClipboardList,
  Upload,
  Phone,
  User,
  Info,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import type { AreaDirection } from '@/types';

const ALL_SERVICES: { key: string; labelAr: string; labelEn: string }[] = [
  { key: 'prayer_room', labelAr: 'مصلى', labelEn: 'Prayer Room' },
  { key: 'dining_hall', labelAr: 'غرف طعام', labelEn: 'Dining Hall' },
  { key: 'medical_clinic', labelAr: 'عيادة طبية', labelEn: 'Medical Clinic' },
  { key: 'laundry_room', labelAr: 'غرف غسيل الملابس', labelEn: 'Laundry Room' },
  { key: 'sports_court', labelAr: 'ملعب رياضي', labelEn: 'Multi-Sports Court' },
  { key: 'maintenance_workshop', labelAr: 'ورش صيانة', labelEn: 'Maintenance Workshop' },
  { key: 'maintenance_warehouse', labelAr: 'مستودعات صيانة', labelEn: 'Maintenance Warehouse' },
  { key: 'cleaning_warehouse', labelAr: 'مستودعات مواد نظافة', labelEn: 'Cleaning Supplies Warehouse' },
  { key: 'open_spaces', labelAr: 'مساحات مفتوحة', labelEn: 'Open Spaces' },
  { key: 'supermarket', labelAr: 'سوبر ماركت', labelEn: 'Supermarket' },
  { key: 'security_offices', labelAr: 'مكاتب أمن', labelEn: 'Security Offices' },
  { key: 'admin_offices', labelAr: 'مكاتب إدارية', labelEn: 'Administrative Offices' },
  { key: 'cafe', labelAr: 'مقهى داخلي', labelEn: 'Indoor Café' },
  { key: 'bakery', labelAr: 'مخبز', labelEn: 'Bakery' },
  { key: 'green_spaces', labelAr: 'مسطحات خضراء', labelEn: 'Landscaped Green Spaces' },
  { key: 'furniture_warehouse', labelAr: 'مستودعات أثاث', labelEn: 'Furniture Warehouses' },
  { key: 'bus_parking', labelAr: 'مواقف للباصات', labelEn: 'Bus Parking Lots' },
  { key: 'water_tanks', labelAr: 'خزانات مياه للغسيل', labelEn: 'Water Tanks' },
  { key: 'central_kitchens', labelAr: 'مطابخ مركزية', labelEn: 'Central Kitchens' },
  { key: 'seating_areas', labelAr: 'مقاعد جلوس واستراحات مظللة', labelEn: 'Shaded Seating Areas' },
  { key: 'sewage_tanks', labelAr: 'خزانات صرف صحي', labelEn: 'Sewage Tanks' },
  { key: 'internal_streets', labelAr: 'شوارع داخلية', labelEn: 'Internal Streets' },
  { key: 'mens_salon', labelAr: 'صالون رجالي (حلاق)', labelEn: "Men's Salon" },
  { key: 'drinking_water', labelAr: 'خزانات مياه شرب', labelEn: 'Drinking Water Tanks' },
];

export default function NewPropertyPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'ar';
  const isAr = locale === 'ar';

  const [submitted, setSubmitted] = useState(false);

  // Owner info
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  // Property basic info
  const [propertyNameAr, setPropertyNameAr] = useState('');
  const [propertyNameEn, setPropertyNameEn] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [district, setDistrict] = useState('');
  const [areaDirection, setAreaDirection] = useState<AreaDirection | ''>('');
  const [totalArea, setTotalArea] = useState('');
  const [totalCapacity, setTotalCapacity] = useState('');
  const [totalRooms, setTotalRooms] = useState('');

  // Contract type
  const [contractType, setContractType] = useState<'rental' | 'ownership' | ''>('');

  // Licenses
  const [groupHousingLicense, setGroupHousingLicense] = useState('');
  const [civilDefenseLicense, setCivilDefenseLicense] = useState('');
  const [buildingPermit, setBuildingPermit] = useState('');

  // Files
  const [groupHousingFile, setGroupHousingFile] = useState<File | null>(null);
  const [civilDefenseFile, setCivilDefenseFile] = useState<File | null>(null);
  const [buildingPermitFile, setBuildingPermitFile] = useState<File | null>(null);
  const [contractFile, setContractFile] = useState<File | null>(null);

  // Services
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());

  // Notes
  const [notes, setNotes] = useState('');

  const toggleService = (key: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-16 max-w-3xl mx-auto">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FEF0E8]">
              <CheckCircle className="h-10 w-10 text-[#F15A29]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isAr ? 'تم استلام طلبك بنجاح!' : 'Your request was received!'}
            </h2>
            <p className="max-w-md text-gray-600">
              {isAr
                ? 'سيتم التواصل معك خلال 48 ساعة لإرسال فريق من الشركة لزيارة العقار وتأكيد المواصفات.'
                : 'We will contact you within 48 hours to send a company team to visit the property and verify the specifications.'}
            </p>
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#F15A29]/20 bg-[#FEF0E8] p-4 text-start">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#F15A29]" />
              <div className="text-sm text-[#666]">
                <p className="font-medium text-[#F15A29]">
                  {isAr ? 'الخطوة التالية' : 'Next Step'}
                </p>
                <p className="mt-1">
                  {isAr
                    ? 'يقوم فريقنا بزيارة الموقع للتحقق من صحة البيانات والتراخيص والخدمات المتوفرة قبل اعتماد العقار على المنصة.'
                    : 'Our team visits the site to verify data, licenses, and available services before approving the property on the platform.'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="mt-4"
            >
              {isAr ? 'إضافة عقار آخر' : 'Add Another Property'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {isAr ? 'إضافة عقار' : 'Add Property'}
        </h1>
        <p className="mt-2 text-gray-600">
          {isAr
            ? 'املأ البيانات التالية وسيقوم فريقنا بالتواصل معك لزيارة العقار'
            : 'Fill in the details below and our team will contact you to visit the property'}
        </p>
      </div>

      {/* Verification notice */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#F15A29]/20 bg-[#FEF0E8] p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#F15A29]" />
        <div className="text-sm">
          <p className="font-semibold text-[#F15A29]">
            {isAr ? 'عملية التحقق' : 'Verification Process'}
          </p>
          <p className="mt-1 text-[#666]">
            {isAr
              ? 'بعد الإرسال، سيتم إرسال فريق من شركة مساكن لزيارة العقار والتحقق من المواصفات والتراخيص قبل نشر العقار على المنصة.'
              : "After submission, Msakn's team will visit the property to verify specifications and licenses before publishing on the platform."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Owner Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#F15A29]" />
              <h2 className="text-lg font-semibold text-gray-900">
                {isAr ? 'بيانات المالك' : 'Owner Information'}
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={isAr ? 'الاسم الكامل' : 'Full Name'}
                required
                icon={<User className="h-4 w-4" />}
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder={isAr ? 'محمد أحمد' : 'Mohammed Ahmed'}
              />
              <Input
                label={isAr ? 'رقم التواصل' : 'Contact Number'}
                type="tel"
                required
                icon={<Phone className="h-4 w-4" />}
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                placeholder="+966 5X XXX XXXX"
              />
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#F15A29]" />
              <h2 className="text-lg font-semibold text-gray-900">
                {isAr ? 'بيانات العقار' : 'Property Details'}
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={isAr ? 'اسم العقار (عربي)' : 'Property Name (Arabic)'}
                required
                icon={<Building2 className="h-4 w-4" />}
                value={propertyNameAr}
                onChange={(e) => setPropertyNameAr(e.target.value)}
                placeholder="مجمع مساكن"
              />
              <Input
                label={isAr ? 'اسم العقار (إنجليزي)' : 'Property Name (English)'}
                icon={<Building2 className="h-4 w-4" />}
                value={propertyNameEn}
                onChange={(e) => setPropertyNameEn(e.target.value)}
                placeholder="Masakin Complex"
              />
              <Select
                label={isAr ? 'المدينة' : 'City'}
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Riyadh">{isAr ? 'الرياض' : 'Riyadh'}</option>
              </Select>
              <Input
                label={isAr ? 'الحي' : 'District'}
                required
                icon={<MapPin className="h-4 w-4" />}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder={isAr ? 'الرمال' : 'Al Rimal'}
              />
              <Select
                label={isAr ? 'الاتجاه' : 'Direction'}
                required
                value={areaDirection}
                onChange={(e) => setAreaDirection(e.target.value as AreaDirection)}
              >
                <option value="">{isAr ? 'اختر' : 'Select'}</option>
                <option value="north">{isAr ? 'شمال' : 'North'}</option>
                <option value="south">{isAr ? 'جنوب' : 'South'}</option>
                <option value="east">{isAr ? 'شرق' : 'East'}</option>
                <option value="west">{isAr ? 'غرب' : 'West'}</option>
                <option value="central">{isAr ? 'وسط' : 'Central'}</option>
              </Select>
              <Input
                label={isAr ? 'المساحة (متر مربع)' : 'Total Area (m²)'}
                type="number"
                min={0}
                required
                icon={<Ruler className="h-4 w-4" />}
                value={totalArea}
                onChange={(e) => setTotalArea(e.target.value)}
                placeholder="20640"
              />
              <Input
                label={isAr ? 'السعة الإجمالية (عدد الأفراد)' : 'Total Capacity'}
                type="number"
                min={1}
                required
                value={totalCapacity}
                onChange={(e) => setTotalCapacity(e.target.value)}
                placeholder="3500"
              />
              <Input
                label={isAr ? 'عدد الغرف' : 'Number of Rooms'}
                type="number"
                min={1}
                required
                value={totalRooms}
                onChange={(e) => setTotalRooms(e.target.value)}
                placeholder="592"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contract Type */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-[#F15A29]" />
              <h2 className="text-lg font-semibold text-gray-900">
                {isAr ? 'نوع العقد' : 'Contract Type'}
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <label className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
                contractType === 'ownership' ? 'border-[#F15A29] bg-[#FEF0E8]' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="contractType"
                  checked={contractType === 'ownership'}
                  onChange={() => setContractType('ownership')}
                  className="h-4 w-4 text-[#F15A29] focus:ring-[#F15A29]"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {isAr ? 'صك ملكية' : 'Ownership Deed'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isAr ? 'أنا مالك العقار' : 'I own the property'}
                  </p>
                </div>
              </label>
              <label className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
                contractType === 'rental' ? 'border-[#F15A29] bg-[#FEF0E8]' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="contractType"
                  checked={contractType === 'rental'}
                  onChange={() => setContractType('rental')}
                  className="h-4 w-4 text-[#F15A29] focus:ring-[#F15A29]"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {isAr ? 'عقد إيجار' : 'Rental Contract'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isAr ? 'أنا مستأجر العقار' : 'I rent the property'}
                  </p>
                </div>
              </label>
            </div>

            <FileUpload
              label={isAr ? 'إرفاق صك الملكية / عقد الإيجار' : 'Attach Deed / Rental Contract'}
              file={contractFile}
              onChange={setContractFile}
              isAr={isAr}
            />
          </CardContent>
        </Card>

        {/* Licenses */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#F15A29]" />
              <h2 className="text-lg font-semibold text-gray-900">
                {isAr ? 'التراخيص' : 'Licenses'}
              </h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Group Individual Housing License */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#F15A29]" />
                <h3 className="font-medium text-gray-900">
                  {isAr ? 'ترخيص سكن أفراد جماعي' : 'Group Individual Housing License'}
                </h3>
              </div>
              <Input
                required
                value={groupHousingLicense}
                onChange={(e) => setGroupHousingLicense(e.target.value)}
                placeholder={isAr ? 'رقم الترخيص' : 'License Number'}
              />
              <FileUpload
                label={isAr ? 'إرفاق نسخة الترخيص' : 'Attach License Document'}
                file={groupHousingFile}
                onChange={setGroupHousingFile}
                isAr={isAr}
              />
            </div>

            {/* Civil Defense License */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#F15A29]" />
                <h3 className="font-medium text-gray-900">
                  {isAr ? 'ترخيص الدفاع المدني' : 'Civil Defense License'}
                </h3>
              </div>
              <Input
                required
                value={civilDefenseLicense}
                onChange={(e) => setCivilDefenseLicense(e.target.value)}
                placeholder={isAr ? 'رقم الترخيص' : 'License Number'}
              />
              <FileUpload
                label={isAr ? 'إرفاق نسخة الترخيص' : 'Attach License Document'}
                file={civilDefenseFile}
                onChange={setCivilDefenseFile}
                isAr={isAr}
              />
            </div>

            {/* Building Permit */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex items-center gap-2">
                <Construction className="h-4 w-4 text-[#F15A29]" />
                <h3 className="font-medium text-gray-900">
                  {isAr ? 'رخصة البناء' : 'Building Permit'}
                </h3>
              </div>
              <Input
                required
                value={buildingPermit}
                onChange={(e) => setBuildingPermit(e.target.value)}
                placeholder={isAr ? 'رقم الرخصة' : 'Permit Number'}
              />
              <FileUpload
                label={isAr ? 'إرفاق نسخة الرخصة' : 'Attach Permit Document'}
                file={buildingPermitFile}
                onChange={setBuildingPermitFile}
                isAr={isAr}
              />
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#F15A29]" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {isAr ? 'الخدمات المتوفرة' : 'Available Services'}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {isAr ? `اختر من 24 خدمة (${selectedServices.size} محدد)` : `Choose from 24 services (${selectedServices.size} selected)`}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {ALL_SERVICES.map((svc) => {
                const isSelected = selectedServices.has(svc.key);
                return (
                  <label
                    key={svc.key}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
                      isSelected
                        ? 'border-[#F15A29] bg-[#FEF0E8] text-[#F15A29] font-medium'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleService(svc.key)}
                      className="h-4 w-4 rounded border-gray-300 text-[#F15A29] focus:ring-[#F15A29]"
                    />
                    <span>{isAr ? svc.labelAr : svc.labelEn}</span>
                  </label>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              {isAr ? 'ملاحظات إضافية' : 'Additional Notes'}
            </h2>
          </CardHeader>
          <CardContent>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isAr
                ? 'أي معلومات إضافية تود مشاركتها عن العقار...'
                : 'Any additional information about the property...'}
              className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#F15A29] focus:outline-none focus:ring-2 focus:ring-[#F15A29]/20"
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline">
            {isAr ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button type="submit" size="lg" className="bg-[#F15A29] hover:bg-[#D94C1E]">
            {isAr ? 'إرسال طلب إضافة العقار' : 'Submit Property Request'}
          </Button>
        </div>
      </form>
    </div>
  );
}

function FileUpload({
  label,
  file,
  onChange,
  isAr,
}: {
  label: string;
  file: File | null;
  onChange: (f: File | null) => void;
  isAr: boolean;
}) {
  return (
    <label className="block cursor-pointer">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </span>
      <div className={`flex items-center gap-3 rounded-lg border-2 border-dashed p-4 transition-colors ${
        file ? 'border-[#F15A29] bg-[#FEF0E8]' : 'border-gray-300 bg-gray-50 hover:border-gray-400'
      }`}>
        <Upload className={`h-5 w-5 shrink-0 ${file ? 'text-[#F15A29]' : 'text-gray-400'}`} />
        <div className="min-w-0 flex-1">
          {file ? (
            <>
              <p className="truncate text-sm font-medium text-[#F15A29]">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                {isAr ? 'اضغط لاختيار ملف' : 'Click to select file'}
              </p>
              <p className="text-xs text-gray-400">PDF, JPG, PNG</p>
            </>
          )}
        </div>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="hidden"
        />
      </div>
    </label>
  );
}
