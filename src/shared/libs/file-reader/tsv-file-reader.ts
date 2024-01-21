import EventEmitter from 'node:events';
import { createReadStream } from "node:fs";
import { FileReader } from "./index.js";

const CHUNK_SIZE = 16384; // 16KB

// наследование от EventEmitter необходимо для того, что бы повесить прослушивание через emit и и потом его прослушать
export class TSVFileReader  extends EventEmitter implements FileReader {
  // private rawData = '';

  constructor (private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, { 
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8' 
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        // вешаем событие "line"
        this.emit('line', completeRow);
      }
    }
    
    // вешаем событие "end"
    this.emit('end', importedRowCount);
  }

  // toArray() {
  //   if (!this.rawData) {
  //     throw new Error('File was not read');
  //   }

  //   return this.rawData
  //     .split('\n')                            // каждую строку в отдельный массив помещает и добавляет вместо табуляции '\t' 
  //     .filter((row) => row.trim().length > 0) // НИЧЕГО НЕ ДЕЛАЕТ
  //     .map((line) => line.split('\t'))        // разбивает на отдельные елементы в массиве елементы, которые были разделены ранее табуляцией (сейчас там '\t') 
  //     .map(([
  //       title, 
  //       description, 
  //       createdDate, 
  //       city, 
  //       cover, 
  //       pictures, 
  //       premium, 
  //       favorites, 
  //       rating, 
  //       type, 
  //       numberRooms, 
  //       numberGuests, 
  //       price,
  //       amenities,
  //       author,
  //       numberComments,
  //       coordinates,
  //     ]) => 
  //     ({// создание объекта
  //       title,                                          // наименование
  //       description,                                    // описание
  //       postDate: new Date(createdDate),                // дата
  //       city,                                           // город
  //       cover,                                          // обложка
  //       pictures: pictures.split(','),                  // массив фотографий
  //       premium: premium.toLowerCase()     === 'true',  // премиум (boolean)
  //       favorites: favorites.toLowerCase() === 'true',  // избранное (boolean)
  //       rating,                                         // рейтинг
  //       type,                                           // тип жилья
  //       numberRooms: Number(numberRooms),               // количество комнат
  //       numberGuests: Number(numberGuests),             // количество гостей
  //       price,                                          // цена
  //       amenities: amenities.split(','),                // Удобства
  //       author,                                         // автор поста
  //       numberComments: Number(numberComments),         // количество комнат
  //       coordinates: coordinates.split(',')             // координаты жилья [latitude, longitude]
  //     }));
  // }
}