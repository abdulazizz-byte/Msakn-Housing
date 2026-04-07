import { NextRequest, NextResponse } from 'next/server';
import { sampleProperties } from '@/lib/sample-data';
import type { Property } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    let filtered: Property[] = [...sampleProperties];

    const city = searchParams.get('city');
    if (city) {
      filtered = filtered.filter(
        (p) => p.city.toLowerCase() === city.toLowerCase()
      );
    }

    const areaDirection = searchParams.get('area_direction');
    if (areaDirection) {
      filtered = filtered.filter((p) => p.area_direction === areaDirection);
    }

    const roomType = searchParams.get('room_type');
    if (roomType) {
      filtered = filtered.filter((p) => {
        switch (roomType) {
          case 'shared': return p.has_shared_rooms;
          case 'technician': return p.has_technician_rooms;
          case 'engineer': return p.has_engineer_rooms;
          default: return true;
        }
      });
    }

    const maxPrice = searchParams.get('max_price');
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      filtered = filtered.filter((p) => {
        const price = roomType === 'engineer'
          ? p.price_engineer
          : roomType === 'technician'
            ? p.price_technician
            : p.price_shared;
        return price != null && price <= max;
      });
    }

    const minCapacity = searchParams.get('min_capacity');
    if (minCapacity) {
      const min = parseInt(minCapacity, 10);
      filtered = filtered.filter((p) => p.available_capacity >= min);
    }

    const services = searchParams.get('services');
    if (services) {
      const serviceList = services.split(',').map((s) => s.trim().toLowerCase());
      filtered = filtered.filter((p) => {
        return serviceList.every((service) => {
          switch (service) {
            case 'catering': return p.has_catering;
            case 'cleaning': return p.has_cleaning;
            case 'maintenance': return p.has_maintenance;
            case 'transportation': return p.has_transportation;
            default: return true;
          }
        });
      });
    }

    return NextResponse.json({ properties: filtered, count: filtered.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.city || !body.total_capacity) {
      return NextResponse.json(
        { error: 'Missing required fields: title, city, total_capacity' },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();
    const property = {
      id,
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: 'Property created successfully', property },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
