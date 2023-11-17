export interface IGrade {
  id: number;
  description?: string | null;
}

export type NewGrade = Omit<IGrade, 'id'> & { id: null };
