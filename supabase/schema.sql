-- =============================================
-- Worker Housing Marketplace - Database Schema
-- Saudi Arabia (Starting in Riyadh)
-- =============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- =============================================
-- ENUMS
-- =============================================

CREATE TYPE user_role AS ENUM ('company', 'provider', 'admin');
CREATE TYPE request_status AS ENUM ('open', 'matched', 'closed', 'cancelled');
CREATE TYPE offer_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE booking_status AS ENUM ('confirmed', 'active', 'completed', 'cancelled');
CREATE TYPE room_type AS ENUM ('shared', 'technician', 'engineer');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'verified', 'rejected');
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'paused', 'archived');
CREATE TYPE area_direction AS ENUM ('north', 'south', 'east', 'west', 'central');

-- =============================================
-- USERS (extends Supabase auth.users)
-- =============================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'company',
    full_name TEXT NOT NULL,
    full_name_ar TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    preferred_language TEXT DEFAULT 'ar' CHECK (preferred_language IN ('ar', 'en')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COMPANIES (Demand Side)
-- =============================================

CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    name_ar TEXT,
    commercial_registration TEXT, -- السجل التجاري
    city TEXT NOT NULL DEFAULT 'Riyadh',
    industry TEXT,
    employee_count INTEGER,
    contact_person TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PROPERTIES (Supply Side)
-- =============================================

CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Basic Info
    title TEXT NOT NULL,
    title_ar TEXT,
    description TEXT,
    description_ar TEXT,

    -- Location
    city TEXT NOT NULL DEFAULT 'Riyadh',
    district TEXT NOT NULL,
    district_ar TEXT,
    area_direction area_direction NOT NULL,
    address TEXT,
    address_ar TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,

    -- Capacity
    total_capacity INTEGER NOT NULL,
    total_rooms INTEGER NOT NULL,
    workers_per_room INTEGER NOT NULL DEFAULT 4,
    available_capacity INTEGER NOT NULL,

    -- Room Types Available
    has_shared_rooms BOOLEAN DEFAULT true,
    has_technician_rooms BOOLEAN DEFAULT false,
    has_engineer_rooms BOOLEAN DEFAULT false,

    -- Pricing (SAR per worker per month)
    price_shared DECIMAL(10,2),
    price_technician DECIMAL(10,2),
    price_engineer DECIMAL(10,2),

    -- Services
    has_catering BOOLEAN DEFAULT false,
    has_cleaning BOOLEAN DEFAULT false,
    has_maintenance BOOLEAN DEFAULT false,
    has_transportation BOOLEAN DEFAULT false,
    catering_price DECIMAL(10,2) DEFAULT 0,
    cleaning_price DECIMAL(10,2) DEFAULT 0,
    maintenance_price DECIMAL(10,2) DEFAULT 0,
    transportation_price DECIMAL(10,2) DEFAULT 0,

    -- Compliance
    license_number TEXT,
    license_status TEXT DEFAULT 'pending',
    municipality_approved BOOLEAN DEFAULT false,

    -- Platform Verification
    verification_status verification_status DEFAULT 'unverified',
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES public.profiles(id),
    verification_notes TEXT,

    -- Status
    status listing_status DEFAULT 'active',
    is_platform_managed BOOLEAN DEFAULT false, -- true if platform is the operator

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PROPERTY IMAGES
-- =============================================

CREATE TABLE public.property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    caption TEXT,
    caption_ar TEXT,
    is_primary BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- HOUSING REQUESTS (Demand Side)
-- =============================================

CREATE TABLE public.housing_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Requirements
    worker_count INTEGER NOT NULL,
    city TEXT NOT NULL DEFAULT 'Riyadh',
    area_direction area_direction,
    preferred_district TEXT,

    -- Timeline
    contract_duration_months INTEGER NOT NULL,
    move_in_date DATE NOT NULL,

    -- Room Preferences
    room_type room_type NOT NULL DEFAULT 'shared',

    -- Budget
    max_budget_per_worker DECIMAL(10,2),

    -- Required Services
    needs_catering BOOLEAN DEFAULT false,
    needs_cleaning BOOLEAN DEFAULT false,
    needs_maintenance BOOLEAN DEFAULT false,
    needs_transportation BOOLEAN DEFAULT false,

    -- Additional
    special_requirements TEXT,

    -- Status
    status request_status DEFAULT 'open',

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- =============================================
-- OFFERS (Providers respond to requests)
-- =============================================

CREATE TABLE public.offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES public.housing_requests(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Offer Details
    price_per_worker DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    available_capacity INTEGER NOT NULL,

    -- Services Included in Offer
    includes_catering BOOLEAN DEFAULT false,
    includes_cleaning BOOLEAN DEFAULT false,
    includes_maintenance BOOLEAN DEFAULT false,
    includes_transportation BOOLEAN DEFAULT false,

    -- Offer message
    message TEXT,
    message_ar TEXT,

    -- Matching Score (calculated by platform)
    match_score DECIMAL(5,2) DEFAULT 0, -- 0-100

    -- Status
    status offer_status DEFAULT 'pending',

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- =============================================
-- BOOKINGS (Future-ready)
-- =============================================

CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offer_id UUID REFERENCES public.offers(id),
    request_id UUID REFERENCES public.housing_requests(id),
    property_id UUID NOT NULL REFERENCES public.properties(id),
    company_id UUID NOT NULL REFERENCES public.companies(id),

    -- Booking Details
    worker_count INTEGER NOT NULL,
    price_per_worker DECIMAL(10,2) NOT NULL,
    total_monthly_price DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(4,2) DEFAULT 10.00, -- 10%
    commission_amount DECIMAL(10,2),

    -- Duration
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    -- Status
    status booking_status DEFAULT 'confirmed',

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- REVIEWS (Future-ready)
-- =============================================

CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id),
    property_id UUID NOT NULL REFERENCES public.properties(id),

    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    comment_ar TEXT,

    -- Category ratings
    cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    location_rating INTEGER CHECK (location_rating >= 1 AND location_rating <= 5),
    value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
    service_rating INTEGER CHECK (service_rating >= 1 AND service_rating <= 5),

    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- NOTIFICATIONS
-- =============================================

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    title_ar TEXT,
    body TEXT,
    body_ar TEXT,
    type TEXT NOT NULL, -- 'new_request', 'new_offer', 'offer_accepted', etc.
    reference_id UUID, -- ID of related entity
    reference_type TEXT, -- 'request', 'offer', 'booking', etc.
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_area ON public.properties(area_direction);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_verification ON public.properties(verification_status);
CREATE INDEX idx_properties_capacity ON public.properties(available_capacity);
CREATE INDEX idx_properties_owner ON public.properties(owner_id);
CREATE INDEX idx_properties_location ON public.properties(latitude, longitude);

CREATE INDEX idx_requests_status ON public.housing_requests(status);
CREATE INDEX idx_requests_city ON public.housing_requests(city);
CREATE INDEX idx_requests_company ON public.housing_requests(company_id);

CREATE INDEX idx_offers_request ON public.offers(request_id);
CREATE INDEX idx_offers_property ON public.offers(property_id);
CREATE INDEX idx_offers_status ON public.offers(status);
CREATE INDEX idx_offers_score ON public.offers(match_score DESC);

CREATE INDEX idx_bookings_property ON public.bookings(property_id);
CREATE INDEX idx_bookings_company ON public.bookings(company_id);

CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.housing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Companies: owners can manage, all can read
CREATE POLICY "Companies are viewable by everyone" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Users can manage own company" ON public.companies FOR ALL USING (profile_id = auth.uid());

-- Properties: active are public, owners can manage all
CREATE POLICY "Active properties are viewable" ON public.properties FOR SELECT USING (status = 'active' OR owner_id = auth.uid());
CREATE POLICY "Owners can manage properties" ON public.properties FOR ALL USING (owner_id = auth.uid());

-- Property images: follow property access
CREATE POLICY "Property images viewable with property" ON public.property_images FOR SELECT USING (true);
CREATE POLICY "Owners can manage property images" ON public.property_images FOR ALL USING (
    property_id IN (SELECT id FROM public.properties WHERE owner_id = auth.uid())
);

-- Requests: open are public for providers, own for companies
CREATE POLICY "Open requests viewable by providers" ON public.housing_requests FOR SELECT USING (
    status = 'open' OR requester_id = auth.uid()
);
CREATE POLICY "Companies can manage own requests" ON public.housing_requests FOR ALL USING (requester_id = auth.uid());

-- Offers: involved parties can see
CREATE POLICY "Offer parties can view" ON public.offers FOR SELECT USING (
    provider_id = auth.uid() OR
    request_id IN (SELECT id FROM public.housing_requests WHERE requester_id = auth.uid())
);
CREATE POLICY "Providers can manage own offers" ON public.offers FOR ALL USING (provider_id = auth.uid());

-- Bookings: involved parties
CREATE POLICY "Booking parties can view" ON public.bookings FOR SELECT USING (
    company_id IN (SELECT id FROM public.companies WHERE profile_id = auth.uid()) OR
    property_id IN (SELECT id FROM public.properties WHERE owner_id = auth.uid())
);

-- Notifications: own only
CREATE POLICY "Users see own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- =============================================
-- FUNCTIONS
-- =============================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON public.housing_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON public.offers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Calculate commission on booking
CREATE OR REPLACE FUNCTION calculate_commission()
RETURNS TRIGGER AS $$
BEGIN
    NEW.commission_amount = NEW.total_monthly_price * (NEW.commission_rate / 100);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_booking_commission BEFORE INSERT OR UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION calculate_commission();
