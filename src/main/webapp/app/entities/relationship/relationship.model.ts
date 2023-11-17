import { RelationshipType } from 'app/entities/enumerations/relationship-type.model';

export interface IRelationship {
  id: number;
  relationshipType?: RelationshipType | null;
}

export type NewRelationship = Omit<IRelationship, 'id'> & { id: null };
