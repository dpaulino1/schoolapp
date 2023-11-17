import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISchoolInfo, NewSchoolInfo } from '../school-info.model';

export type PartialUpdateSchoolInfo = Partial<ISchoolInfo> & Pick<ISchoolInfo, 'id'>;

export type EntityResponseType = HttpResponse<ISchoolInfo>;
export type EntityArrayResponseType = HttpResponse<ISchoolInfo[]>;

@Injectable({ providedIn: 'root' })
export class SchoolInfoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/school-infos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(schoolInfo: NewSchoolInfo): Observable<EntityResponseType> {
    return this.http.post<ISchoolInfo>(this.resourceUrl, schoolInfo, { observe: 'response' });
  }

  update(schoolInfo: ISchoolInfo): Observable<EntityResponseType> {
    return this.http.put<ISchoolInfo>(`${this.resourceUrl}/${this.getSchoolInfoIdentifier(schoolInfo)}`, schoolInfo, {
      observe: 'response',
    });
  }

  partialUpdate(schoolInfo: PartialUpdateSchoolInfo): Observable<EntityResponseType> {
    return this.http.patch<ISchoolInfo>(`${this.resourceUrl}/${this.getSchoolInfoIdentifier(schoolInfo)}`, schoolInfo, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISchoolInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISchoolInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSchoolInfoIdentifier(schoolInfo: Pick<ISchoolInfo, 'id'>): number {
    return schoolInfo.id;
  }

  compareSchoolInfo(o1: Pick<ISchoolInfo, 'id'> | null, o2: Pick<ISchoolInfo, 'id'> | null): boolean {
    return o1 && o2 ? this.getSchoolInfoIdentifier(o1) === this.getSchoolInfoIdentifier(o2) : o1 === o2;
  }

  addSchoolInfoToCollectionIfMissing<Type extends Pick<ISchoolInfo, 'id'>>(
    schoolInfoCollection: Type[],
    ...schoolInfosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const schoolInfos: Type[] = schoolInfosToCheck.filter(isPresent);
    if (schoolInfos.length > 0) {
      const schoolInfoCollectionIdentifiers = schoolInfoCollection.map(schoolInfoItem => this.getSchoolInfoIdentifier(schoolInfoItem)!);
      const schoolInfosToAdd = schoolInfos.filter(schoolInfoItem => {
        const schoolInfoIdentifier = this.getSchoolInfoIdentifier(schoolInfoItem);
        if (schoolInfoCollectionIdentifiers.includes(schoolInfoIdentifier)) {
          return false;
        }
        schoolInfoCollectionIdentifiers.push(schoolInfoIdentifier);
        return true;
      });
      return [...schoolInfosToAdd, ...schoolInfoCollection];
    }
    return schoolInfoCollection;
  }
}
