import { Amenities, TypeApartment } from "../../../types/apartment.interface.js";

export class CreateApartmentDto {
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
}