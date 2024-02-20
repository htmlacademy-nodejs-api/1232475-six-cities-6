import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { UserModel } from '../shared/modules/user/user.model.js';
import { ApartmentModel } from '../shared/modules/apartment/apartment.entity.js';
// import { UserModel } from '../shared/modules/user/user.entity.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) {}

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);


    try {
      
      const mongoUri = getMongoURI(
        this.config.get('DB_USER'),
        this.config.get('DB_PASSWORD'),
        this.config.get('DB_HOST'),
        this.config.get('DB_PORT'),
        this.config.get('DB_NAME'),
     );

      await this._initDb();


      console.log('mongoUri', mongoUri);
      this.logger.info('User creating');
      // const user = await UserModel.create({
      //   email: 'test1au1qser@example.com',
      //   avatar: 'keks.jpg',
      //   name: 'Keks',
      //   type: 22
      // });
      
 
      // this.logger.info('User created:', user);


      const apartment = await ApartmentModel.create({
        title: 'test1au1qser@example.com',
        description: 'keks.jpg',
        createdDate: new Date,
        city: '22',
        cover: '22',
        pictures: '22',
        premium: false,
        favorites: false,
        rating: '22',
        type: '22',
        numberRooms: '22',
        numberGuests: '22',
        price: '22',
        amenities: '22',
        author: '22',
        numberComments: '22',
        coordinates: '22',
      });


      this.logger.info('User created:', apartment);
      this.logger.info('Init database…');

      const appartments = await ApartmentModel.find({});
      this.logger.info(appartments as any)
      this.logger.info('User created:');



  // Извлечение всех пользователей
  const allUsers = await UserModel.find();

  console.log('All users:', allUsers);
      // console.log(user)

      this.logger.info('Init database completed');

    } catch (error: any) {
      console.log(error.message)
      this.logger.error('Error creating user:', error.message);
    }

  }
}