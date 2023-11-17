import { RelationshipType } from 'app/entities/enumerations/relationship-type.model';

import { IRelationship, NewRelationship } from './relationship.model';

export const sampleWithRequiredData: IRelationship = {
  id: 63972,
};

export const sampleWithPartialData: IRelationship = {
  id: 19967,
  relationshipType: RelationshipType['Guardian'],
};

export const sampleWithFullData: IRelationship = {
  id: 7047,
  relationshipType: RelationshipType['Mother'],
};

export const sampleWithNewData: NewRelationship = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
