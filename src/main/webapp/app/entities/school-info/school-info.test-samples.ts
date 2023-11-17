import { ISchoolInfo, NewSchoolInfo } from './school-info.model';

export const sampleWithRequiredData: ISchoolInfo = {
  id: 46626,
  schoolName: 'Global Práctico firewall',
  address: 'Leone transition',
  phoneNumber: 'Morado Intranet',
};

export const sampleWithPartialData: ISchoolInfo = {
  id: 91786,
  schoolName: 'payment Riera Mejorado',
  address: 'Granito Borders web-readiness',
  phoneNumber: 'Hormigon',
  email: 'Vctor.Ocasio35@yahoo.com',
};

export const sampleWithFullData: ISchoolInfo = {
  id: 71080,
  schoolName: 'viral',
  address: 'explícita',
  phoneNumber: 'Money',
  email: 'Mariana_Merino95@yahoo.com',
  principalName: 'Singapur',
  schoolDescription: 'Metal back bidireccional',
};

export const sampleWithNewData: NewSchoolInfo = {
  schoolName: 'República',
  address: 'Ergonómico conjunto clicks-and-mortar',
  phoneNumber: 'partnerships Pequeño',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
