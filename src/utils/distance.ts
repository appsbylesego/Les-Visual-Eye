// Haversine formula for calculating distance between two coordinates
function toRad(deg: number): number {
  return deg * Math.PI / 180;
}

export function haversineDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Your base location (studio/home) - KEEP THIS PRIVATE
// Vosloorus Ext 31, Gauteng
export const BASE_LOCATION = {
  lat: -26.3465,
  lng: 28.2018,
  city: 'Vosloorus'
};

// Distance thresholds (in km)
export const DISTANCE_THRESHOLDS = {
  LOCAL: 15,           // 0-15km: All packages available
  MID_RANGE_START: 15, // 15-30km: Deluxe or Full Experience
  MID_RANGE_END: 30,
  FAR_START: 31,       // 31-50km: Full Experience only
  FAR_END: 50,
  MAX_DISTANCE: 50     // Beyond 50km: Unavailable
};

// Calculate distance from base location to client location
export function calculateDistanceFromBase(clientLat: number, clientLng: number): number {
  return haversineDistanceKm(BASE_LOCATION.lat, BASE_LOCATION.lng, clientLat, clientLng);
}

// Get available packages based on distance
export function getAvailablePackages(distanceKm: number) {
  if (distanceKm <= DISTANCE_THRESHOLDS.LOCAL) {
    return ['bundle', 'deluxe', 'full'];
  } else if (distanceKm <= DISTANCE_THRESHOLDS.MID_RANGE_END) {
    return ['deluxe', 'full'];
  } else if (distanceKm <= DISTANCE_THRESHOLDS.FAR_END) {
    return ['full'];
  }
  return []; // Out of service area (beyond 50km)
}

// Check if "Meet Me Halfway" is available
export function isMeetHalfwayEligible(distanceKm: number): boolean {
  return false; // Feature disabled - max distance is 50km
}

// Get distance band description
export function getDistanceBand(distanceKm: number): string {
  if (distanceKm <= DISTANCE_THRESHOLDS.LOCAL) {
    return '0-15km (Local)';
  } else if (distanceKm <= DISTANCE_THRESHOLDS.MID_RANGE_END) {
    return '15-30km (Mid-Range)';
  } else if (distanceKm <= DISTANCE_THRESHOLDS.FAR_END) {
    return '31-50km (Far Range)';
  }
  return 'Beyond 50km (Out of Service Area)';
}
