import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISchoolInfo } from '../school-info.model';
import { SchoolInfoService } from '../service/school-info.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './school-info-delete-dialog.component.html',
})
export class SchoolInfoDeleteDialogComponent {
  schoolInfo?: ISchoolInfo;

  constructor(protected schoolInfoService: SchoolInfoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.schoolInfoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
