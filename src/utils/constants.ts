import type { PackageType } from '../types';

export const PACKAGES: PackageType[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '15,000',
    period: 'month',
    features: [
      'Business Profile Creation',
      'Up to 5 Service Listings',
      'Basic Contact Information',
      'Mobile-Friendly Profile',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '25,000',
    period: 'month',
    popular: true,
    features: [
      'Everything in Basic',
      'Up to 20 Service Listings',
      'Photo Gallery (up to 10 photos)',
      'Priority in Search Results',
      'Customer Reviews & Ratings',
      'WhatsApp Integration',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '50,000',
    period: 'month',
    features: [
      'Everything in Professional',
      'Unlimited Service Listings',
      'Unlimited Photo Gallery',
      'Featured Business Badge',
      'Advanced Analytics',
      'Social Media Integration',
      'Priority Customer Support',
    ],
  },
];

export const SERVICE_CATEGORIES = [
  'Construction',
  'Professional',
  'Specialized',
  'Roofing',
  'Painting',
  'Carpentry',
  'Cleaning',
  'Pest Control',
  'Other',
];

export const COUNTRIES = [
  'Cameroon',
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'Other',
];

export const formatCurrency = (amount: string): string => {
  return `${amount} FCFA`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};
