import dayjs from 'dayjs/esm';

import { IParent, NewParent } from './parent.model';

export const sampleWithRequiredData: IParent = {
  id: 76908,
  firstName: 'Cristián',
  lastName: 'Vallejo',
};

export const sampleWithPartialData: IParent = {
  id: 12992,
  firstName: 'Diana',
  lastName: 'Alvarado',
  email: 'Clemente.Vela@gmail.com',
  address: 'focus',
};

export const sampleWithFullData: IParent = {
  id: 24934,
  firstName: 'Víctor',
  lastName: 'Gómez',
  email: 'Olivia_Ros@hotmail.com',
  dateOfBirth: dayjs('2023-11-17'),
  gender: 'a',
  phoneNumber: 'Valenciana Yuan Implementado',
  address: 'Paraguay terciaria relationships',
};

export const sampleWithNewData: NewParent = {
  firstName: 'Víctor',
  lastName: 'Bueno',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
