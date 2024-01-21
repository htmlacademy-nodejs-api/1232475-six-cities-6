import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { MockServerData } from '../../types/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {

    const title           = getRandomItem<string>(this.mockData.title);
    const description     = getRandomItem<string>(this.mockData.description);
    const city            = getRandomItem<string>(this.mockData.city);
    const cover           = getRandomItem<string>(this.mockData.cover);
    const pictures        = getRandomItems<string>(this.mockData.pictures).join(';');
    const premium         = getRandomItem<string>(this.mockData.premium);
    const favorites       = getRandomItem<string>(this.mockData.favorites);
    const rating          = getRandomItem<string>(this.mockData.rating);
    const type            = getRandomItem<string>(this.mockData.type);
    const numberRooms     = getRandomItem<string>(this.mockData.numberRooms);
    const numberGuests    = getRandomItem<string>(this.mockData.numberGuests);
    const price           = getRandomItem<string>(this.mockData.price);
    const amenities       = getRandomItems<string>(this.mockData.amenities).join(';');
    const author          = getRandomItem<string>(this.mockData.author);
    const numberComments  = getRandomItem<string>(this.mockData.numberComments);
    const coordinates     = getRandomItem<string>(this.mockData.coordinates);

    // генерим случайную дату
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, createdDate,
      city, cover, pictures, premium,
      favorites, rating, type, numberRooms,
      numberGuests, price, amenities, author,
      numberComments, coordinates,
    ].join('\t');
  }
}