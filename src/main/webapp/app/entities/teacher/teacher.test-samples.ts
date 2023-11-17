import dayjs from 'dayjs/esm';

import { ITeacher, NewTeacher } from './teacher.model';

export const sampleWithRequiredData: ITeacher = {
  id: 42798,
  firstName: 'Octavio',
  lastName: 'Menéndez',
};

export const sampleWithPartialData: ITeacher = {
  id: 58108,
  firstName: 'Gloria',
  lastName: 'Ríos',
  phoneNumber: 'Blanco',
  dateOfBirth: dayjs('2023-11-17'),
};

export const sampleWithFullData: ITeacher = {
  id: 43516,
  firstName: 'Armando',
  lastName: 'Acuña',
  email: 'Cristin.Lira79@gmail.com',
  phoneNumber: 'Cine Azul',
  dateOfBirth: dayjs('2023-11-17'),
  gender: 'B',
};

export const sampleWithNewData: NewTeacher = {
  firstName: 'María José',
  lastName: 'Reyna',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
