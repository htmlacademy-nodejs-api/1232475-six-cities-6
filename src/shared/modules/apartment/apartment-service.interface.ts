import {DocumentType} from '@typegoose/typegoose';
import { CreateApartmentDto } from './dto/create-apartment.dto.js';
import { ApartmentEntity } from './apartment.entity.js';

export interface ApartmentService {
  create(dto: CreateApartmentDto): Promise<DocumentType<ApartmentEntity>>;
  findByApartmentId(apartmentId: string): Promise<DocumentType<ApartmentEntity> | null>;
  findByApartmentTitle(apartmentName: string): Promise<DocumentType<ApartmentEntity> | null>;
  findByApartmentTitleOrCreate(apartmentName: string, dto: CreateApartmentDto): Promise<DocumentType<ApartmentEntity>>;
}