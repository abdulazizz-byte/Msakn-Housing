-- =============================================
-- SEED DATA - Realistic Saudi Market Data
-- =============================================

-- Note: In production, profiles are created via Supabase Auth.
-- These UUIDs simulate auth.users entries for demo purposes.

-- Demo Users
INSERT INTO public.profiles (id, role, full_name, full_name_ar, email, phone, preferred_language) VALUES
('11111111-1111-1111-1111-111111111111', 'company', 'Mohammed Al-Rashid', 'محمد الراشد', 'mohammed@alrashid-construction.sa', '+966501234567', 'ar'),
('22222222-2222-2222-2222-222222222222', 'company', 'Khalid Al-Otaibi', 'خالد العتيبي', 'khalid@otaibi-industries.sa', '+966502345678', 'ar'),
('33333333-3333-3333-3333-333333333333', 'provider', 'Abdullah Al-Saud', 'عبدالله آل سعود', 'abdullah@saud-properties.sa', '+966503456789', 'ar'),
('44444444-4444-4444-4444-444444444444', 'provider', 'Faisal Al-Dosari', 'فيصل الدوسري', 'faisal@dosari-housing.sa', '+966504567890', 'ar'),
('55555555-5555-5555-5555-555555555555', 'provider', 'Saeed Al-Qahtani', 'سعيد القحطاني', 'saeed@qahtani-residences.sa', '+966505678901', 'ar'),
('66666666-6666-6666-6666-666666666666', 'admin', 'Admin User', 'مدير النظام', 'admin@sakan-workforce.sa', '+966500000000', 'ar');

-- Companies
INSERT INTO public.companies (id, profile_id, name, name_ar, commercial_registration, city, industry, employee_count, contact_person, contact_phone) VALUES
('aaaa1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Al-Rashid Construction', 'شركة الراشد للمقاولات', 'CR-1010234567', 'Riyadh', 'Construction', 2500, 'Mohammed Al-Rashid', '+966501234567'),
('aaaa2222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Otaibi Industrial Group', 'مجموعة العتيبي الصناعية', 'CR-1010345678', 'Riyadh', 'Manufacturing', 1200, 'Khalid Al-Otaibi', '+966502345678');

-- Properties
INSERT INTO public.properties (
    id, owner_id, title, title_ar, description, description_ar,
    city, district, district_ar, area_direction, address, address_ar,
    latitude, longitude,
    total_capacity, total_rooms, workers_per_room, available_capacity,
    has_shared_rooms, has_technician_rooms, has_engineer_rooms,
    price_shared, price_technician, price_engineer,
    has_catering, has_cleaning, has_maintenance, has_transportation,
    catering_price, cleaning_price, maintenance_price, transportation_price,
    license_number, verification_status, status, is_platform_managed
) VALUES
(
    'bbbb1111-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333333',
    'Al-Saud Worker Residence - North Riyadh',
    'سكن آل سعود للعمال - شمال الرياض',
    'Modern worker housing complex with full amenities. Located near the industrial area with easy access to major highways.',
    'مجمع سكن عمال حديث مع جميع المرافق. يقع بالقرب من المنطقة الصناعية مع سهولة الوصول للطرق الرئيسية.',
    'Riyadh', 'Al-Sulay', 'السلي', 'north',
    'King Fahd Road, Al-Sulay District', 'طريق الملك فهد، حي السلي',
    24.8200, 46.7100,
    500, 125, 4, 200,
    true, true, false,
    800.00, 1200.00, NULL,
    true, true, true, true,
    300.00, 100.00, 50.00, 200.00,
    'LIC-RYD-2024-001', 'verified', 'active', false
),
(
    'bbbb2222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    'Saud Premium Workers Housing',
    'سكن سعود المتميز للعمال',
    'Premium housing facility with private rooms for engineers and technicians. Modern kitchen and recreation areas.',
    'مرفق سكني متميز مع غرف خاصة للمهندسين والفنيين. مطبخ حديث ومناطق ترفيهية.',
    'Riyadh', 'Al-Naseem', 'النسيم', 'east',
    'Eastern Ring Road, Al-Naseem', 'الطريق الدائري الشرقي، النسيم',
    24.6900, 46.8000,
    300, 100, 3, 120,
    true, true, true,
    900.00, 1400.00, 2200.00,
    true, true, true, false,
    350.00, 120.00, 60.00, 0,
    'LIC-RYD-2024-002', 'verified', 'active', false
),
(
    'bbbb3333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    'Dosari Workers Camp - Industrial City',
    'مخيم الدوسري للعمال - المدينة الصناعية',
    'Large-scale worker accommodation near the Second Industrial City. Budget-friendly with essential services.',
    'سكن عمال واسع بالقرب من المدينة الصناعية الثانية. اقتصادي مع الخدمات الأساسية.',
    'Riyadh', 'Industrial City 2', 'المدينة الصناعية الثانية', 'south',
    'Second Industrial City Road', 'طريق المدينة الصناعية الثانية',
    24.5500, 46.8500,
    1000, 200, 5, 450,
    true, false, false,
    600.00, NULL, NULL,
    true, true, false, true,
    250.00, 80.00, 0, 180.00,
    'LIC-RYD-2024-003', 'unverified', 'active', false
),
(
    'bbbb4444-4444-4444-4444-444444444444',
    '55555555-5555-5555-5555-555555555555',
    'Qahtani Executive Housing',
    'سكن القحطاني التنفيذي',
    'Executive-grade housing for engineers and senior technicians. Private rooms, gym, and lounge area.',
    'سكن تنفيذي للمهندسين والفنيين الكبار. غرف خاصة، صالة رياضية، ومنطقة استراحة.',
    'Riyadh', 'Al-Malqa', 'الملقا', 'north',
    'Prince Turki Road, Al-Malqa', 'طريق الأمير تركي، الملقا',
    24.8400, 46.6200,
    150, 80, 2, 60,
    false, true, true,
    NULL, 1600.00, 2800.00,
    true, true, true, true,
    400.00, 150.00, 80.00, 250.00,
    'LIC-RYD-2024-004', 'verified', 'active', false
),
(
    'bbbb5555-5555-5555-5555-555555555555',
    '44444444-4444-4444-4444-444444444444',
    'Dosari West Riyadh Complex',
    'مجمع الدوسري غرب الرياض',
    'Newly built worker housing in western Riyadh. Clean, modern, and well-maintained with 24/7 security.',
    'سكن عمال حديث البناء في غرب الرياض. نظيف وعصري ومُصان بحراسة على مدار الساعة.',
    'Riyadh', 'Dhahrat Laban', 'ظهرة لبن', 'west',
    'Al-Imam University Road', 'طريق جامعة الإمام',
    24.6800, 46.5800,
    400, 100, 4, 280,
    true, true, false,
    750.00, 1100.00, NULL,
    false, true, true, false,
    0, 90.00, 50.00, 0,
    'LIC-RYD-2024-005', 'pending', 'active', false
),
(
    'bbbb6666-6666-6666-6666-666666666666',
    '66666666-6666-6666-6666-666666666666',
    'Sakan Workforce Premium - Platform Managed',
    'سكن القوى العاملة المتميز - بإدارة المنصة',
    'Platform-operated premium worker housing. Full-service accommodation with dedicated management.',
    'سكن عمال متميز بإدارة المنصة. إقامة متكاملة الخدمات مع إدارة مخصصة.',
    'Riyadh', 'Al-Arid', 'العارض', 'north',
    'King Salman Road, Al-Arid', 'طريق الملك سلمان، العارض',
    24.8600, 46.6800,
    250, 80, 3, 100,
    true, true, true,
    950.00, 1500.00, 2500.00,
    true, true, true, true,
    350.00, 130.00, 70.00, 220.00,
    'LIC-RYD-2024-006', 'verified', 'active', true
);

-- Property Images
INSERT INTO public.property_images (property_id, url, caption, caption_ar, is_primary, sort_order) VALUES
('bbbb1111-1111-1111-1111-111111111111', '/images/properties/prop1-main.jpg', 'Main building exterior', 'واجهة المبنى الرئيسي', true, 0),
('bbbb1111-1111-1111-1111-111111111111', '/images/properties/prop1-room.jpg', 'Shared room (4 workers)', 'غرفة مشتركة (4 عمال)', false, 1),
('bbbb1111-1111-1111-1111-111111111111', '/images/properties/prop1-dining.jpg', 'Dining hall', 'صالة الطعام', false, 2),
('bbbb2222-2222-2222-2222-222222222222', '/images/properties/prop2-main.jpg', 'Premium facility entrance', 'مدخل المرفق المتميز', true, 0),
('bbbb2222-2222-2222-2222-222222222222', '/images/properties/prop2-room.jpg', 'Engineer private room', 'غرفة المهندس الخاصة', false, 1),
('bbbb3333-3333-3333-3333-333333333333', '/images/properties/prop3-main.jpg', 'Camp overview', 'نظرة عامة على المخيم', true, 0),
('bbbb4444-4444-4444-4444-444444444444', '/images/properties/prop4-main.jpg', 'Executive building', 'المبنى التنفيذي', true, 0),
('bbbb5555-5555-5555-5555-555555555555', '/images/properties/prop5-main.jpg', 'West complex entrance', 'مدخل المجمع الغربي', true, 0),
('bbbb6666-6666-6666-6666-666666666666', '/images/properties/prop6-main.jpg', 'Platform managed facility', 'المرفق بإدارة المنصة', true, 0);

-- Housing Requests
INSERT INTO public.housing_requests (
    id, company_id, requester_id, worker_count, city, area_direction,
    contract_duration_months, move_in_date, room_type,
    max_budget_per_worker,
    needs_catering, needs_cleaning, needs_maintenance, needs_transportation,
    special_requirements, status
) VALUES
(
    'cccc1111-1111-1111-1111-111111111111',
    'aaaa1111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    150, 'Riyadh', 'north',
    12, '2026-05-01', 'shared',
    900.00,
    true, true, true, true,
    'Workers for a construction project near King Fahd Road. Need immediate availability.',
    'open'
),
(
    'cccc2222-2222-2222-2222-222222222222',
    'aaaa2222-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    30, 'Riyadh', 'east',
    6, '2026-06-15', 'technician',
    1500.00,
    true, true, false, false,
    'Technicians for factory setup in the industrial area. Need 2-per-room arrangement.',
    'open'
),
(
    'cccc3333-3333-3333-3333-333333333333',
    'aaaa1111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    10, 'Riyadh', 'north',
    24, '2026-04-20', 'engineer',
    3000.00,
    true, true, true, true,
    'Senior engineers overseeing the NEOM supply chain project. Need private rooms with premium amenities.',
    'open'
);

-- Sample Offers
INSERT INTO public.offers (
    id, request_id, property_id, provider_id,
    price_per_worker, total_price, available_capacity,
    includes_catering, includes_cleaning, includes_maintenance, includes_transportation,
    message, message_ar, match_score, status
) VALUES
(
    'dddd1111-1111-1111-1111-111111111111',
    'cccc1111-1111-1111-1111-111111111111',
    'bbbb1111-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333333',
    850.00, 127500.00, 200,
    true, true, true, true,
    'We have 200 beds available immediately in our North Riyadh facility. Full services included.',
    'لدينا 200 سرير متاح فوراً في منشأتنا شمال الرياض. جميع الخدمات متضمنة.',
    92.50, 'pending'
),
(
    'dddd2222-2222-2222-2222-222222222222',
    'cccc1111-1111-1111-1111-111111111111',
    'bbbb3333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    650.00, 97500.00, 450,
    true, true, false, true,
    'Budget-friendly option with large capacity. No maintenance service but everything else included.',
    'خيار اقتصادي بسعة كبيرة. بدون خدمة صيانة ولكن كل شيء آخر متضمن.',
    75.00, 'pending'
),
(
    'dddd3333-3333-3333-3333-333333333333',
    'cccc2222-2222-2222-2222-222222222222',
    'bbbb2222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    1350.00, 40500.00, 50,
    true, true, true, false,
    'Premium technician rooms available. 2 per room with modern amenities.',
    'غرف فنيين متميزة متاحة. 2 لكل غرفة مع مرافق حديثة.',
    88.00, 'pending'
);
