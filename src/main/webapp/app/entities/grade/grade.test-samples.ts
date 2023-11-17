import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 2061,
};

export const sampleWithPartialData: IGrade = {
  id: 17693,
  description: 'Cambridgeshire Hecho withdrawal',
};

export const sampleWithFullData: IGrade = {
  id: 11986,
  description: 'Pelota Humano Seguro',
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
