export type Amenities = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export type TypeApartment = 'apartment' | 'house' | 'room' | 'hotel';

export interface Apartment {
  title: string;
  description: string;
  createdDate: Date;
  city: string;
  cover: string;
  pictures: string[];
  premium: boolean;
  favorites: boolean;
  rating: string;
  type: TypeApartment;
  numberRooms: number;
  numberGuests: number;
  price: string;
  amenities: Amenities[];
  author: string;
  numberComments: number;
  coordinates: string[];
};
