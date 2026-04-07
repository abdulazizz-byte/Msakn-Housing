import { NextRequest, NextResponse } from 'next/server';
import { matchProperties } from '@/lib/matching';
import { sampleProperties } from '@/lib/sample-data';
import type { HousingRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: HousingRequest = await request.json();

    if (!body.city || !body.worker_count || !body.room_type) {
      return NextResponse.json(
        { error: 'Missing required fields: city, worker_count, room_type' },
        { status: 400 }
      );
    }

    const results = matchProperties(body, sampleProperties);

    return NextResponse.json({
      results,
      count: results.length,
      request_summary: {
        city: body.city,
        worker_count: body.worker_count,
        room_type: body.room_type,
        max_budget: body.max_budget_per_worker ?? null,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to run matching engine' },
      { status: 500 }
    );
  }
}
