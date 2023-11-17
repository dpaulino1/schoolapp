import dayjs from 'dayjs/esm';

export interface IStudent {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: dayjs.Dayjs | null;
  gender?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
}

export type NewStudent = Omit<IStudent, 'id'> & { id: null };
