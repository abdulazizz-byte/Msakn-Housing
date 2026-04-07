import { NextRequest, NextResponse } from 'next/server';
import { sampleRequests } from '@/lib/sample-data';

export async function GET() {
  try {
    return NextResponse.json({
      requests: sampleRequests,
      count: sampleRequests.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requiredFields = [
      'worker_count',
      'city',
      'contract_duration_months',
      'move_in_date',
      'room_type',
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
    const housingRequest = {
      id,
      ...body,
      status: 'open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: 'Housing request created successfully', request: housingRequest },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create housing request' },
      { status: 500 }
    );
  }
}
