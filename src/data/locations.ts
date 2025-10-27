// South African cities and major locations with coordinates
// This allows clients to select their city without exposing exact addresses

export interface Location {
  name: string;
  lat: number;
  lng: number;
  province: string;
}

export const SOUTH_AFRICAN_LOCATIONS: Location[] = [
  // Gauteng
  { name: 'Pretoria CBD', lat: -25.7479, lng: 28.2293, province: 'Gauteng' },
  { name: 'Pretoria East', lat: -25.7829, lng: 28.3447, province: 'Gauteng' },
  { name: 'Centurion', lat: -25.8601, lng: 28.1894, province: 'Gauteng' },
  { name: 'Johannesburg CBD', lat: -26.2041, lng: 28.0473, province: 'Gauteng' },
  { name: 'Sandton', lat: -26.1076, lng: 28.0567, province: 'Gauteng' },
  { name: 'Rosebank', lat: -26.1467, lng: 28.0407, province: 'Gauteng' },
  { name: 'Randburg', lat: -26.0939, lng: 27.9826, province: 'Gauteng' },
  { name: 'Roodepoort', lat: -26.1624, lng: 27.8724, province: 'Gauteng' },
  { name: 'Soweto', lat: -26.2678, lng: 27.8585, province: 'Gauteng' },
  { name: 'Midrand', lat: -25.9953, lng: 28.1211, province: 'Gauteng' },
  { name: 'Benoni', lat: -26.1885, lng: 28.3207, province: 'Gauteng' },
  { name: 'Boksburg', lat: -26.2123, lng: 28.2620, province: 'Gauteng' },
  { name: 'Germiston', lat: -26.2253, lng: 28.1770, province: 'Gauteng' },
  { name: 'Springs', lat: -26.2539, lng: 28.4421, province: 'Gauteng' },
  { name: 'Krugersdorp', lat: -26.0853, lng: 27.7738, province: 'Gauteng' },
  { name: 'Alberton', lat: -26.2674, lng: 28.1216, province: 'Gauteng' },
  { name: 'Vosloorus', lat: -26.3465, lng: 28.2018, province: 'Gauteng' },

  // Western Cape
  { name: 'Cape Town CBD', lat: -33.9249, lng: 18.4241, province: 'Western Cape' },
  { name: 'Stellenbosch', lat: -33.9321, lng: 18.8602, province: 'Western Cape' },
  { name: 'Paarl', lat: -33.7269, lng: 18.9648, province: 'Western Cape' },

  // KwaZulu-Natal
  { name: 'Durban', lat: -29.8587, lng: 31.0218, province: 'KwaZulu-Natal' },
  { name: 'Pietermaritzburg', lat: -29.6003, lng: 30.3794, province: 'KwaZulu-Natal' },

  // Eastern Cape
  { name: 'Port Elizabeth', lat: -33.9608, lng: 25.6022, province: 'Eastern Cape' },
  { name: 'East London', lat: -33.0153, lng: 27.9116, province: 'Eastern Cape' },

  // Free State
  { name: 'Bloemfontein', lat: -29.0852, lng: 26.1596, province: 'Free State' },

  // North West
  { name: 'Rustenburg', lat: -25.6672, lng: 27.2421, province: 'North West' },

  // Mpumalanga
  { name: 'Nelspruit', lat: -25.4753, lng: 30.9706, province: 'Mpumalanga' },

  // Limpopo
  { name: 'Polokwane', lat: -23.9045, lng: 29.4689, province: 'Limpopo' },

  // Northern Cape
  { name: 'Kimberley', lat: -28.7282, lng: 24.7499, province: 'Northern Cape' },
];

// Get only Gauteng locations (service area restriction)
export function getGautengLocations(): Location[] {
  return SOUTH_AFRICAN_LOCATIONS.filter(loc => loc.province === 'Gauteng');
}

// Group locations by province for easier selection
export function getLocationsByProvince(): Record<string, Location[]> {
  const grouped: Record<string, Location[]> = {};

  SOUTH_AFRICAN_LOCATIONS.forEach(location => {
    if (!grouped[location.province]) {
      grouped[location.province] = [];
    }
    grouped[location.province].push(location);
  });

  return grouped;
}

// Search for location by name
export function findLocationByName(name: string): Location | undefined {
  return SOUTH_AFRICAN_LOCATIONS.find(loc =>
    loc.name.toLowerCase() === name.toLowerCase()
  );
}
