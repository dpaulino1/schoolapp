import dayjs from 'dayjs/esm';

export interface ITeacher {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: dayjs.Dayjs | null;
  gender?: string | null;
}

export type NewTeacher = Omit<ITeacher, 'id'> & { id: null };
