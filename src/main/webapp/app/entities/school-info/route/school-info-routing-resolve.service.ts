import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISchoolInfo } from '../school-info.model';
import { SchoolInfoService } from '../service/school-info.service';

@Injectable({ providedIn: 'root' })
export class SchoolInfoRoutingResolveService implements Resolve<ISchoolInfo | null> {
  constructor(protected service: SchoolInfoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISchoolInfo | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((schoolInfo: HttpResponse<ISchoolInfo>) => {
          if (schoolInfo.body) {
            return of(schoolInfo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
