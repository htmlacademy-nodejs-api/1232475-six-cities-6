import { readFileSync } from "node:fs";
import { FileReader } from "./index.js";

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor (
    private readonly filename: string
  ){}

  read() {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  toArray() {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')                            // каждую строку в отдельный массив помещает и добавляет вместо табуляции '\t' 
      .filter((row) => row.trim().length > 0) // НИЧЕГО НЕ ДЕЛАЕТ
      .map((line) => line.split('\t'))        // разбивает на отдельные елементы в массиве елементы, которые были разделены ранее табуляцией (сейчас там '\t') 
      // 
      .map(([
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
        coordinates,
      ]) => 
      ({// создание объекта
        title,                                          // наименование
        description,                                    // описание
        postDate: new Date(createdDate),                // дата
        city,                                           // город
        cover,                                          // обложка
        pictures: pictures.split(','),                  // массив фотографий
        premium: premium.toLowerCase()     === 'true',  // премиум (boolean)
        favorites: favorites.toLowerCase() === 'true',  // избранное (boolean)
        rating,                                         // рейтинг
        type,                                           // тип жилья
        numberRooms: Number(numberRooms),               // количество комнат
        numberGuests: Number(numberGuests),             // количество гостей
        price,                                          // цена
        amenities: amenities.split(','),                // Удобства
        author,                                         // автор поста
        numberComments: Number(numberComments),         // количество комнат
        coordinates: coordinates.split(',')             // координаты жилья [latitude, longitude]
      }));
  }
}