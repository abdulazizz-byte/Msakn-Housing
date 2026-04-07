import { NextRequest, NextResponse } from 'next/server';
import type { Offer } from '@/types';

const sampleOffers: Offer[] = [
  {
    id: 'dddd1111-1111-1111-1111-111111111111',
    request_id: 'cccc1111-1111-1111-1111-111111111111',
    property_id: 'bbbb1111-1111-1111-1111-111111111111',
    provider_id: '33333333-3333-3333-3333-333333333333',
    price_per_worker: 800,
    total_price: 120000,
    available_capacity: 200,
    includes_catering: true,
    includes_cleaning: true,
    includes_maintenance: true,
    includes_transportation: true,
    message: 'We can accommodate all 150 workers immediately in our north Riyadh facility.',
    match_score: 87.5,
    status: 'pending',
    created_at: '2026-03-05T00:00:00Z',
    updated_at: '2026-03-05T00:00:00Z',
  },
  {
    id: 'dddd2222-2222-2222-2222-222222222222',
    request_id: 'cccc1111-1111-1111-1111-111111111111',
    property_id: 'bbbb6666-6666-6666-6666-666666666666',
    provider_id: '66666666-6666-6666-6666-666666666666',
    price_per_worker: 950,
    total_price: 142500,
    available_capacity: 100,
    includes_catering: true,
    includes_cleaning: true,
    includes_maintenance: true,
    includes_transportation: true,
    message: 'Platform-managed premium housing. We can take 100 workers with full services.',
    match_score: 79.2,
    status: 'pending',
    created_at: '2026-03-06T00:00:00Z',
    updated_at: '2026-03-06T00:00:00Z',
  },
  {
    id: 'dddd3333-3333-3333-3333-333333333333',
    request_id: 'cccc2222-2222-2222-2222-222222222222',
    property_id: 'bbbb2222-2222-2222-2222-222222222222',
    provider_id: '33333333-3333-3333-3333-333333333333',
    price_per_worker: 1400,
    total_price: 42000,
    available_capacity: 120,
    includes_catering: true,
    includes_cleaning: true,
    includes_maintenance: true,
    includes_transportation: false,
    message: 'Premium technician rooms available in east Riyadh. Ready for move-in.',
    match_score: 82.0,
    status: 'pending',
    created_at: '2026-03-20T00:00:00Z',
    updated_at: '2026-03-20T00:00:00Z',
  },
];

export async function GET(request: NextRequest) {
  try {
    const requestId = request.nextUrl.searchParams.get('request_id');

    if (requestId) {
      const filtered = sampleOffers.filter((o) => o.request_id === requestId);
      return NextResponse.json({ offers: filtered, count: filtered.length });
    }

    return NextResponse.json({ offers: sampleOffers, count: sampleOffers.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = [
      'request_id',
      'property_id',
      'price_per_worker',
      'available_capacity',
    ] as const;

    const missing = requiredFields.filter(
      (field) => body[field] === undefined || body[field] === null
    );

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();
    const offer = {
      id,
      ...body,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: 'Offer created successfully', offer },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create offer' },
      { status: 500 }
    );
  }
}
