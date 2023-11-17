import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SchoolInfoComponent } from '../list/school-info.component';
import { SchoolInfoDetailComponent } from '../detail/school-info-detail.component';
import { SchoolInfoUpdateComponent } from '../update/school-info-update.component';
import { SchoolInfoRoutingResolveService } from './school-info-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const schoolInfoRoute: Routes = [
  {
    path: '',
    component: SchoolInfoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SchoolInfoDetailComponent,
    resolve: {
      schoolInfo: SchoolInfoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SchoolInfoUpdateComponent,
    resolve: {
      schoolInfo: SchoolInfoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SchoolInfoUpdateComponent,
    resolve: {
      schoolInfo: SchoolInfoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(schoolInfoRoute)],
  exports: [RouterModule],
})
export class SchoolInfoRoutingModule {}
