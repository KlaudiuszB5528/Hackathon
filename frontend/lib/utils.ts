import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type LatLng = {
  lat: number;
  lng: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCenterLatLng(points: LatLng[]): LatLng {
  if (points.length === 0) {
    throw new Error('No points provided');
  }

  let totalLat = 0;
  let totalLng = 0;

  points.forEach((point) => {
    totalLat += point.lat;
    totalLng += point.lng;
  });

  return {
    lat: totalLat / points.length,
    lng: totalLng / points.length,
  };
}
