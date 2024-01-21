import { Amenities, Apartment, TypeApartment } from '../types/index.js';

export function createOffer(offerData: string): Apartment {
  const [
    title, 
    description, 
    createdDate, 
    city, 
    cover, 
    pictures, 
    premium, 
    favorites, 
    rating, 
    type, 
    numberRooms, 
    numberGuests, 
    price,
    amenities,
    author,
    numberComments,
    coordinates
  ] = offerData.replace('\n', '').split('\t');


  return {
    title, 
    description, 
    createdDate    : new Date(createdDate), 
    city, 
    cover, 
    pictures       : pictures.split(';').map((picture) => picture), 
    premium        : premium.toLowerCase() === 'true', 
    favorites      : favorites.toLowerCase() === 'true', 
    rating, 
    type           : type as TypeApartment, 
    numberRooms    : Number(numberRooms), 
    numberGuests   : Number(numberGuests), 
    price,
    amenities      : amenities.split(',') as Amenities[],
    author,
    numberComments : Number(numberComments),
    coordinates    : coordinates.split(',').map((coordinate) => coordinate)
  };
}