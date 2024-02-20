import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Amenities, Apartment, TypeApartment } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface ApartmentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'categories',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class ApartmentEntity extends defaultClasses.TimeStamps implements Apartment {
  @prop({required: true, trim: true})
  public title          : string;

  @prop({required: true, trim: true})
  public description    : string;

  @prop({required: true})
  public createdDate    : Date;                         // дата

  @prop({required: true, trim: true})
  public city           : string;                       // город

  @prop({required: true, trim: true})
  public cover          : string;                       // обложка

  @prop({required: true})
  public pictures       : string[];                     // массив фотографий

  @prop({required: true})
  public premium        : boolean;                      // премиум

  @prop({required: true})
  public favorites      : boolean;                      // избранное

  @prop({required: true, trim: true})
  public rating         : string;                       // рейтинг

  @prop({required: true})
  public type           : TypeApartment;                // тип жилья

  @prop({required: true})
  public numberRooms    : number;                       // количество комнат

  @prop({required: true})
  public numberGuests   : number;                       // количество гостей

  @prop({required: true, trim: true})
  public price          : string;                       // цена

  @prop({required: true})
  public amenities      : Amenities[];                  // Удобства

  @prop({required: true, trim: true})
  public author         : string;                       // автор поста

  @prop({required: true})
  public numberComments : number;                       // количество комментариев

  @prop({required: true})
  public coordinates    : string[];                     // координаты жилья [latitude, longitude]

}

export const ApartmentModel = getModelForClass(ApartmentEntity);