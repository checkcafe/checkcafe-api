export interface Place {
  id: string;
  name: string;
  slug: string;
  description?: string;
  currency?: string;
  priceRange?: string;
  latitude?: number;
  longitude?: number;
  priceRangeMin?: number;
  priceRangeMax?: number;
  openingTime?: string;
  closingTime?: string;
  thumbnailUrl?: string;
  address: PlaceAddress;
  operatingHours?: OperatingHour[];
  placeFacilities?: PlaceFacility[];
  placePhotos?: PlacePhoto[];
  user?: PlaceUser;
}

export interface PlaceAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  countryCode?: string;
}

export interface OperatingHour {
  day: string;
  openingTime: string | null;
  closingTime: string | null;
}

export interface PlaceFacility {
  facility: string;
  description: string;
}

export interface PlacePhoto {
  url: string;
  order: number;
}

export interface PlaceUser {
  name: string;
  username: string;
  avatarUrl?: string;
}
