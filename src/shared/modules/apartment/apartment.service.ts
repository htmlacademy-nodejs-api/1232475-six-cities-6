import { ApartmentService } from './apartment-service.interface.js';
import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { ApartmentEntity } from './apartment.entity.js';
import { CreateApartmentDto } from './dto/create-apartment.dto.js';

export class DefaultApartmentService implements ApartmentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.ApartmentModel) private readonly ApartmentModel: types.ModelType<ApartmentEntity>
  ) {}

  public async create(dto: CreateApartmentDto): Promise<DocumentType<ApartmentEntity>> {
    const result = await this.ApartmentModel.create(dto);
    this.logger.info(`New apartment created: ${dto.title}`);
    return result;
  }

  public async findByApartmentId(apartmentId: string): Promise<DocumentType<ApartmentEntity> | null> {
    return this.ApartmentModel.findById(apartmentId).exec();
  }

  public async findByApartmentTitle(apartmentTitle: string): Promise<DocumentType<ApartmentEntity> | null> {
    return this.ApartmentModel.findOne({name: apartmentTitle}).exec();
  }

  public async findByApartmentTitleOrCreate(apartmentTitle: string, dto: CreateApartmentDto): Promise<DocumentType<ApartmentEntity>> {
    const existedApartment = await this.findByApartmentTitle(apartmentTitle);

    if (existedApartment) {
      return existedApartment;
    }

    return this.create(dto);
  }
}