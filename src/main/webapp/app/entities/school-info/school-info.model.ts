export interface ISchoolInfo {
  id: number;
  schoolName?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  principalName?: string | null;
  schoolDescription?: string | null;
}

export type NewSchoolInfo = Omit<ISchoolInfo, 'id'> & { id: null };
