export interface Package {
  id: string;
  title: string;
  price: number;
  photoCount: number;
  duration: string;
  features: string[];
  description: string;
}

export const PACKAGES: Package[] = [
  {
    id: 'bundle',
    title: 'Cinematic Bundle',
    price: 400,
    photoCount: 18,
    duration: '1 hour',
    features: [
      '18 fully edited cinematic portraits',
      '1-hour photoshoot',
      'Guided posing and direction',
      'Professional color grading',
      '3–5 day delivery'
    ],
    description: 'Perfect for portraits, personal branding, or your social aesthetic.'
  },
  {
    id: 'deluxe',
    title: 'Cinematic Deluxe',
    price: 700,
    photoCount: 30,
    duration: '1.5 hours',
    features: [
      '30 edited cinematic photos',
      '1.5-hour session',
      'Short cinematic video clips (slow motion)',
      'Advanced retouching and color grading',
      '3–5 day delivery'
    ],
    description: 'For models, artists, and creators who want both photos and cinematic motion.'
  },
  {
    id: 'full',
    title: 'Full Cinematic Experience',
    price: 1200,
    photoCount: 50,
    duration: '2 hours',
    features: [
      '50 edited portraits',
      '2-hour shoot with full creative direction',
      'Cinematic video reel (30–60 seconds)',
      'Multiple outfit changes',
      'Priority 5–10 day delivery'
    ],
    description: 'Perfect for campaigns, portfolios, or anyone ready for a full cinematic experience.'
  }
];

export function getPackageById(id: string): Package | undefined {
  return PACKAGES.find(pkg => pkg.id === id);
}

export function getPackagesByIds(ids: string[]): Package[] {
  return PACKAGES.filter(pkg => ids.includes(pkg.id));
}
