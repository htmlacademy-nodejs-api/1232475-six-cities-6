import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { ApartmentService } from './apartment-service.interface.js';
import { DefaultApartmentService } from './apartment.service.js';
import { ApartmentEntity, ApartmentModel } from './apartment.entity.js';

export function createApartmentContainer() {
  const apartmentContainer = new Container();

  apartmentContainer.bind<ApartmentService>(Component.ApartmentService).to(DefaultApartmentService);
  apartmentContainer.bind<types.ModelType<ApartmentEntity>>(Component.ApartmentModel).toConstantValue(ApartmentModel);

  return apartmentContainer;
}