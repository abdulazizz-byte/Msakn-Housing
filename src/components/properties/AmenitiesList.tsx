import {
  Utensils,
  Stethoscope,
  Shirt,
  Dumbbell,
  Wrench,
  Warehouse,
  Sparkles,
  Trees,
  ShoppingCart,
  Shield,
  Briefcase,
  Coffee,
  Cookie,
  Sofa,
  Bus,
  Droplets,
  ChefHat,
  Armchair,
  Waves,
  Route,
  Scissors,
  GlassWater,
  Sprout,
  Flame,
  type LucideIcon,
} from 'lucide-react';

interface Amenity {
  icon: LucideIcon;
  labelAr: string;
  labelEn: string;
}

const AMENITIES: Amenity[] = [
  { icon: Flame, labelAr: 'مصلى', labelEn: 'Prayer Room' },
  { icon: Utensils, labelAr: 'غرف طعام', labelEn: 'Dining Hall' },
  { icon: Stethoscope, labelAr: 'عيادة طبية', labelEn: 'Medical Clinic' },
  { icon: Shirt, labelAr: 'غرف غسيل الملابس', labelEn: 'Laundry Room' },
  { icon: Dumbbell, labelAr: 'ملعب رياضي', labelEn: 'Multi-Sports Court' },
  { icon: Wrench, labelAr: 'ورش صيانة', labelEn: 'Maintenance Workshop' },
  { icon: Warehouse, labelAr: 'مستودعات صيانة', labelEn: 'Maintenance Warehouse' },
  { icon: Sparkles, labelAr: 'مستودعات مواد نظافة', labelEn: 'Cleaning Supplies Warehouse' },
  { icon: Trees, labelAr: 'مساحات مفتوحة', labelEn: 'Open Spaces' },
  { icon: ShoppingCart, labelAr: 'سوبر ماركت', labelEn: 'Supermarket' },
  { icon: Shield, labelAr: 'مكاتب أمن', labelEn: 'Security Offices' },
  { icon: Briefcase, labelAr: 'مكاتب إدارية', labelEn: 'Administrative Offices' },
  { icon: Coffee, labelAr: 'مقهى داخلي', labelEn: 'Indoor Café' },
  { icon: Cookie, labelAr: 'مخبز', labelEn: 'Bakery' },
  { icon: Sprout, labelAr: 'مسطحات خضراء', labelEn: 'Landscaped Green Spaces' },
  { icon: Sofa, labelAr: 'مستودعات أثاث', labelEn: 'Furniture Warehouses' },
  { icon: Bus, labelAr: 'مواقف للباصات', labelEn: 'Bus Parking Lots' },
  { icon: Droplets, labelAr: 'خزانات مياه للغسيل (1200 م³)', labelEn: 'Water Tanks (1,200 m³)' },
  { icon: ChefHat, labelAr: 'مطابخ مركزية', labelEn: 'Central Kitchens' },
  { icon: Armchair, labelAr: 'مقاعد جلوس واستراحات مظللة', labelEn: 'Shaded Seating Areas' },
  { icon: Waves, labelAr: 'خزانات صرف صحي (1200 م³)', labelEn: 'Sewage Tanks (1,200 m³)' },
  { icon: Route, labelAr: 'شوارع داخلية', labelEn: 'Internal Streets' },
  { icon: Scissors, labelAr: 'صالون رجالي (حلاق)', labelEn: "Men's Salon" },
  { icon: GlassWater, labelAr: 'خزانات مياه شرب (1200 م³)', labelEn: 'Drinking Water Tanks (1,200 m³)' },
];

// Property-specific amenities excluded from general homepage view
const PROPERTY_SPECIFIC = new Set([
  'Prayer Room',
  'Multi-Sports Court',
  'Indoor Café',
  'Sewage Tanks (1,200 m³)',
  'Water Tanks (1,200 m³)',
  'Bakery',
  'Supermarket',
  'Maintenance Warehouse',
  "Men's Salon",
  'Cleaning Supplies Warehouse',
]);

interface AmenitiesListProps {
  locale: string;
  general?: boolean;
}

export function AmenitiesList({ locale, general = false }: AmenitiesListProps) {
  const isAr = locale === 'ar';
  const items = general
    ? AMENITIES.filter((a) => !PROPERTY_SPECIFIC.has(a.labelEn))
    : AMENITIES;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((amenity, i) => {
        const Icon = amenity.icon;
        return (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-[#c41e3a]/30 hover:bg-[#fef2f2]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2]">
              <Icon className="h-5 w-5 text-[#c41e3a]" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {isAr ? amenity.labelAr : amenity.labelEn}
            </span>
          </div>
        );
      })}
    </div>
  );
}
