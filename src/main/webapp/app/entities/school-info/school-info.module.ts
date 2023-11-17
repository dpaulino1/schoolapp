import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SchoolInfoComponent } from './list/school-info.component';
import { SchoolInfoDetailComponent } from './detail/school-info-detail.component';
import { SchoolInfoUpdateComponent } from './update/school-info-update.component';
import { SchoolInfoDeleteDialogComponent } from './delete/school-info-delete-dialog.component';
import { SchoolInfoRoutingModule } from './route/school-info-routing.module';

@NgModule({
  imports: [SharedModule, SchoolInfoRoutingModule],
  declarations: [SchoolInfoComponent, SchoolInfoDetailComponent, SchoolInfoUpdateComponent, SchoolInfoDeleteDialogComponent],
})
export class SchoolInfoModule {}
