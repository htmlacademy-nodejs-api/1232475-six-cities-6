export type Amenities = 'Breakfast'                 |
                        'Air conditioning'          | 
                        'Laptop friendly workspace' | 
                        'Baby seat'                 | 
                        'Washer'                    | 
                        'Towels'                    | 
                        'Fridge';

export type TypeApartment = 'apartment' |
                            'house'     | 
                            'room'      | 
                            'hotel';

export interface Apartment {
  title          : string;                       // наименование
  description    : string;                       // описание
  createdDate    : Date;                         // дата
  city           : string;                       // город
  cover          : string;                       // обложка
  pictures       : string[];                     // массив фотографий
  premium        : boolean;                      // премиум
  favorites      : boolean;                      // избранное
  rating         : string;                       // рейтинг
  type           : TypeApartment;                // тип жилья
  numberRooms    : number;                       // количество комнат
  numberGuests   : number;                       // количество гостей
  price          : string;                       // цена
  amenities      : Amenities[];                  // Удобства
  author         : string;                       // автор поста
  numberComments : number;                       // количество комментариев
  coordinates    : string[];                     // координаты жилья [latitude, longitude]
};