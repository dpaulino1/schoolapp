import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRelationship, NewRelationship } from '../relationship.model';

export type PartialUpdateRelationship = Partial<IRelationship> & Pick<IRelationship, 'id'>;

export type EntityResponseType = HttpResponse<IRelationship>;
export type EntityArrayResponseType = HttpResponse<IRelationship[]>;

@Injectable({ providedIn: 'root' })
export class RelationshipService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/relationships');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(relationship: NewRelationship): Observable<EntityResponseType> {
    return this.http.post<IRelationship>(this.resourceUrl, relationship, { observe: 'response' });
  }

  update(relationship: IRelationship): Observable<EntityResponseType> {
    return this.http.put<IRelationship>(`${this.resourceUrl}/${this.getRelationshipIdentifier(relationship)}`, relationship, {
      observe: 'response',
    });
  }

  partialUpdate(relationship: PartialUpdateRelationship): Observable<EntityResponseType> {
    return this.http.patch<IRelationship>(`${this.resourceUrl}/${this.getRelationshipIdentifier(relationship)}`, relationship, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRelationship>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRelationship[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRelationshipIdentifier(relationship: Pick<IRelationship, 'id'>): number {
    return relationship.id;
  }

  compareRelationship(o1: Pick<IRelationship, 'id'> | null, o2: Pick<IRelationship, 'id'> | null): boolean {
    return o1 && o2 ? this.getRelationshipIdentifier(o1) === this.getRelationshipIdentifier(o2) : o1 === o2;
  }

  addRelationshipToCollectionIfMissing<Type extends Pick<IRelationship, 'id'>>(
    relationshipCollection: Type[],
    ...relationshipsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const relationships: Type[] = relationshipsToCheck.filter(isPresent);
    if (relationships.length > 0) {
      const relationshipCollectionIdentifiers = relationshipCollection.map(
        relationshipItem => this.getRelationshipIdentifier(relationshipItem)!
      );
      const relationshipsToAdd = relationships.filter(relationshipItem => {
        const relationshipIdentifier = this.getRelationshipIdentifier(relationshipItem);
        if (relationshipCollectionIdentifiers.includes(relationshipIdentifier)) {
          return false;
        }
        relationshipCollectionIdentifiers.push(relationshipIdentifier);
        return true;
      });
      return [...relationshipsToAdd, ...relationshipCollection];
    }
    return relationshipCollection;
  }
}
