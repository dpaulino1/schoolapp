import dayjs from 'dayjs/esm';

import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 23105,
  firstName: 'Maricarmen',
  lastName: 'Pantoja',
};

export const sampleWithPartialData: IStudent = {
  id: 31770,
  firstName: 'Rebeca',
  lastName: 'Gaona',
  gender: 'd',
  phoneNumber: 'revolutionary',
};

export const sampleWithFullData: IStudent = {
  id: 82317,
  firstName: 'Gabriela',
  lastName: 'Gaitán',
  dateOfBirth: dayjs('2023-11-17'),
  gender: 'A',
  phoneNumber: 'Partida e-markets',
  address: 'Salud B2C Camiseta',
};

export const sampleWithNewData: NewStudent = {
  firstName: 'Anita',
  lastName: 'Ortega',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
