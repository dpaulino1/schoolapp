import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParent, NewParent } from '../parent.model';

export type PartialUpdateParent = Partial<IParent> & Pick<IParent, 'id'>;

type RestOf<T extends IParent | NewParent> = Omit<T, 'dateOfBirth'> & {
  dateOfBirth?: string | null;
};

export type RestParent = RestOf<IParent>;

export type NewRestParent = RestOf<NewParent>;

export type PartialUpdateRestParent = RestOf<PartialUpdateParent>;

export type EntityResponseType = HttpResponse<IParent>;
export type EntityArrayResponseType = HttpResponse<IParent[]>;

@Injectable({ providedIn: 'root' })
export class ParentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/parents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(parent: NewParent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(parent);
    return this.http
      .post<RestParent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(parent: IParent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(parent);
    return this.http
      .put<RestParent>(`${this.resourceUrl}/${this.getParentIdentifier(parent)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(parent: PartialUpdateParent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(parent);
    return this.http
      .patch<RestParent>(`${this.resourceUrl}/${this.getParentIdentifier(parent)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestParent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestParent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getParentIdentifier(parent: Pick<IParent, 'id'>): number {
    return parent.id;
  }

  compareParent(o1: Pick<IParent, 'id'> | null, o2: Pick<IParent, 'id'> | null): boolean {
    return o1 && o2 ? this.getParentIdentifier(o1) === this.getParentIdentifier(o2) : o1 === o2;
  }

  addParentToCollectionIfMissing<Type extends Pick<IParent, 'id'>>(
    parentCollection: Type[],
    ...parentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const parents: Type[] = parentsToCheck.filter(isPresent);
    if (parents.length > 0) {
      const parentCollectionIdentifiers = parentCollection.map(parentItem => this.getParentIdentifier(parentItem)!);
      const parentsToAdd = parents.filter(parentItem => {
        const parentIdentifier = this.getParentIdentifier(parentItem);
        if (parentCollectionIdentifiers.includes(parentIdentifier)) {
          return false;
        }
        parentCollectionIdentifiers.push(parentIdentifier);
        return true;
      });
      return [...parentsToAdd, ...parentCollection];
    }
    return parentCollection;
  }

  protected convertDateFromClient<T extends IParent | NewParent | PartialUpdateParent>(parent: T): RestOf<T> {
    return {
      ...parent,
      dateOfBirth: parent.dateOfBirth?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restParent: RestParent): IParent {
    return {
      ...restParent,
      dateOfBirth: restParent.dateOfBirth ? dayjs(restParent.dateOfBirth) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestParent>): HttpResponse<IParent> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestParent[]>): HttpResponse<IParent[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
