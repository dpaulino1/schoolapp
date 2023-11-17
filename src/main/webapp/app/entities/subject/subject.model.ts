export interface ISubject {
  id: number;
  subjectName?: string | null;
  description?: string | null;
}

export type NewSubject = Omit<ISubject, 'id'> & { id: null };
