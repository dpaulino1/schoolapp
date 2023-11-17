import { ISubject, NewSubject } from './subject.model';

export const sampleWithRequiredData: ISubject = {
  id: 33079,
  subjectName: 'virtual',
};

export const sampleWithPartialData: ISubject = {
  id: 73301,
  subjectName: 'Puente',
  description: 'secundaria',
};

export const sampleWithFullData: ISubject = {
  id: 96835,
  subjectName: 'markets connect Morado',
  description: 'withdrawal Municipio',
};

export const sampleWithNewData: NewSubject = {
  subjectName: 'Diverso reboot Central',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
