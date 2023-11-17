import dayjs from 'dayjs/esm';

export interface IParent {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  dateOfBirth?: dayjs.Dayjs | null;
  gender?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
}

export type NewParent = Omit<IParent, 'id'> & { id: null };
