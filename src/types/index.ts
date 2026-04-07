// =============================================
// Core Types - Worker Housing Marketplace
// =============================================

export type UserRole = 'company' | 'provider' | 'admin';
export type RequestStatus = 'open' | 'matched' | 'closed' | 'cancelled';
export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';
export type BookingStatus = 'confirmed' | 'active' | 'completed' | 'cancelled';
export type RoomType = 'shared' | 'technician' | 'engineer';
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';
export type ListingStatus = 'draft' | 'active' | 'paused' | 'archived';
export type AreaDirection = 'north' | 'south' | 'east' | 'west' | 'central';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  full_name_ar?: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  preferred_language: 'ar' | 'en';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  profile_id: string;
  name: string;
  name_ar?: string;
  commercial_registration?: string;
  city: string;
  industry?: string;
  employee_count?: number;
  contact_person?: string;
  contact_phone?: string;
  contact_email?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  owner_id: string;
  title: string;
  title_ar?: string;
  description?: string;
  description_ar?: string;
  city: string;
  district: string;
  district_ar?: string;
  area_direction: AreaDirection;
  address?: string;
  address_ar?: string;
  latitude?: number;
  longitude?: number;
  total_capacity: number;
  total_rooms: number;
  workers_per_room: number;
  available_capacity: number;
  has_shared_rooms: boolean;
  has_technician_rooms: boolean;
  has_engineer_rooms: boolean;
  price_shared?: number;
  price_technician?: number;
  price_engineer?: number;
  has_catering: boolean;
  has_cleaning: boolean;
  has_maintenance: boolean;
  has_transportation: boolean;
  catering_price: number;
  cleaning_price: number;
  maintenance_price: number;
  transportation_price: number;
  license_number?: string;
  license_status: string;
  municipality_approved: boolean;
  verification_status: VerificationStatus;
  verified_at?: string;
  verified_by?: string;
  verification_notes?: string;
  status: ListingStatus;
  is_platform_managed: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  images?: PropertyImage[];
  owner?: Profile;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  caption?: string;
  caption_ar?: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export interface HousingRequest {
  id: string;
  company_id: string;
  requester_id: string;
  worker_count: number;
  city: string;
  area_direction?: AreaDirection;
  preferred_district?: string;
  contract_duration_months: number;
  move_in_date: string;
  room_type: RoomType;
  max_budget_per_worker?: number;
  needs_catering: boolean;
  needs_cleaning: boolean;
  needs_maintenance: boolean;
  needs_transportation: boolean;
  special_requirements?: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  expires_at?: string;
  // Joined
  company?: Company;
  offers?: Offer[];
}

export interface Offer {
  id: string;
  request_id: string;
  property_id: string;
  provider_id: string;
  price_per_worker: number;
  total_price: number;
  available_capacity: number;
  includes_catering: boolean;
  includes_cleaning: boolean;
  includes_maintenance: boolean;
  includes_transportation: boolean;
  message?: string;
  message_ar?: string;
  match_score: number;
  status: OfferStatus;
  created_at: string;
  updated_at: string;
  expires_at?: string;
  // Joined
  property?: Property;
  provider?: Profile;
}

export interface Booking {
  id: string;
  offer_id?: string;
  request_id?: string;
  property_id: string;
  company_id: string;
  worker_count: number;
  price_per_worker: number;
  total_monthly_price: number;
  commission_rate: number;
  commission_amount: number;
  start_date: string;
  end_date: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  property_id: string;
  rating: number;
  comment?: string;
  comment_ar?: string;
  cleanliness_rating?: number;
  location_rating?: number;
  value_rating?: number;
  service_rating?: number;
  is_public: boolean;
  created_at: string;
}

export interface SearchFilters {
  city?: string;
  area_direction?: AreaDirection;
  min_capacity?: number;
  max_price?: number;
  room_type?: RoomType;
  has_catering?: boolean;
  has_cleaning?: boolean;
  has_maintenance?: boolean;
  has_transportation?: boolean;
  verification_status?: VerificationStatus;
  is_platform_managed?: boolean;
}

export interface MatchResult {
  property: Property;
  score: number;
  breakdown: {
    location_score: number;
    capacity_score: number;
    price_score: number;
    services_score: number;
  };
}
