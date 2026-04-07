import type { HousingRequest, Property, MatchResult } from '@/types';

/**
 * Smart Matching Engine
 * Scores properties against a housing request on 4 dimensions:
 *  - Location (30%)
 *  - Capacity (25%)
 *  - Price (25%)
 *  - Services (20%)
 */

const WEIGHTS = {
  location: 30,
  capacity: 25,
  price: 25,
  services: 20,
};

function scoreLocation(request: HousingRequest, property: Property): number {
  // Same city is mandatory (filtered before scoring)
  let score = 50;

  // Same area direction
  if (request.area_direction && property.area_direction === request.area_direction) {
    score += 40;
  }

  // Same district
  if (request.preferred_district && property.district.toLowerCase().includes(request.preferred_district.toLowerCase())) {
    score += 10;
  }

  return Math.min(score, 100);
}

function scoreCapacity(request: HousingRequest, property: Property): number {
  if (property.available_capacity < request.worker_count) {
    // Can't fully accommodate — partial score based on coverage
    return (property.available_capacity / request.worker_count) * 60;
  }

  // Can accommodate fully
  const ratio = request.worker_count / property.available_capacity;

  // Sweet spot: 50-90% utilization
  if (ratio >= 0.5 && ratio <= 0.9) return 100;
  if (ratio > 0.9) return 95;
  if (ratio >= 0.3) return 80;
  return 60; // Very under-utilized but still fits
}

function scorePrice(request: HousingRequest, property: Property): number {
  if (!request.max_budget_per_worker) return 50; // No budget = neutral

  const propertyPrice = getPriceForRoomType(property, request.room_type);
  if (!propertyPrice) return 0;

  const ratio = propertyPrice / request.max_budget_per_worker;

  if (ratio <= 0.7) return 100;  // Great deal
  if (ratio <= 0.85) return 90;
  if (ratio <= 1.0) return 80;   // Within budget
  if (ratio <= 1.1) return 50;   // Slightly over
  if (ratio <= 1.25) return 25;  // Over budget
  return 0; // Way over
}

function scoreServices(request: HousingRequest, property: Property): number {
  const requested = [
    request.needs_catering,
    request.needs_cleaning,
    request.needs_maintenance,
    request.needs_transportation,
  ];
  const provided = [
    property.has_catering,
    property.has_cleaning,
    property.has_maintenance,
    property.has_transportation,
  ];

  const totalRequested = requested.filter(Boolean).length;
  if (totalRequested === 0) return 100; // No services needed

  const matched = requested.filter((needed, i) => needed && provided[i]).length;
  return (matched / totalRequested) * 100;
}

function getPriceForRoomType(property: Property, roomType: string): number | null {
  switch (roomType) {
    case 'shared': return property.price_shared ?? null;
    case 'technician': return property.price_technician ?? null;
    case 'engineer': return property.price_engineer ?? null;
    default: return property.price_shared ?? null;
  }
}

function hasRoomType(property: Property, roomType: string): boolean {
  switch (roomType) {
    case 'shared': return property.has_shared_rooms;
    case 'technician': return property.has_technician_rooms;
    case 'engineer': return property.has_engineer_rooms;
    default: return true;
  }
}

export function matchProperties(
  request: HousingRequest,
  properties: Property[]
): MatchResult[] {
  return properties
    .filter((p) => {
      // Hard filters
      if (p.city.toLowerCase() !== request.city.toLowerCase()) return false;
      if (p.status !== 'active') return false;
      if (p.available_capacity <= 0) return false;
      if (!hasRoomType(p, request.room_type)) return false;
      return true;
    })
    .map((property) => {
      const location_score = scoreLocation(request, property);
      const capacity_score = scoreCapacity(request, property);
      const price_score = scorePrice(request, property);
      const services_score = scoreServices(request, property);

      const score =
        (location_score * WEIGHTS.location +
          capacity_score * WEIGHTS.capacity +
          price_score * WEIGHTS.price +
          services_score * WEIGHTS.services) /
        100;

      return {
        property,
        score: Math.round(score * 100) / 100,
        breakdown: {
          location_score: Math.round(location_score),
          capacity_score: Math.round(capacity_score),
          price_score: Math.round(price_score),
          services_score: Math.round(services_score),
        },
      };
    })
    .sort((a, b) => b.score - a.score);
}
