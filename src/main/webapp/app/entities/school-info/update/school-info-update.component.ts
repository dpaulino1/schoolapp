import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SchoolInfoFormService, SchoolInfoFormGroup } from './school-info-form.service';
import { ISchoolInfo } from '../school-info.model';
import { SchoolInfoService } from '../service/school-info.service';

@Component({
  selector: 'jhi-school-info-update',
  templateUrl: './school-info-update.component.html',
})
export class SchoolInfoUpdateComponent implements OnInit {
  isSaving = false;
  schoolInfo: ISchoolInfo | null = null;

  editForm: SchoolInfoFormGroup = this.schoolInfoFormService.createSchoolInfoFormGroup();

  constructor(
    protected schoolInfoService: SchoolInfoService,
    protected schoolInfoFormService: SchoolInfoFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ schoolInfo }) => {
      this.schoolInfo = schoolInfo;
      if (schoolInfo) {
        this.updateForm(schoolInfo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const schoolInfo = this.schoolInfoFormService.getSchoolInfo(this.editForm);
    if (schoolInfo.id !== null) {
      this.subscribeToSaveResponse(this.schoolInfoService.update(schoolInfo));
    } else {
      this.subscribeToSaveResponse(this.schoolInfoService.create(schoolInfo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchoolInfo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(schoolInfo: ISchoolInfo): void {
    this.schoolInfo = schoolInfo;
    this.schoolInfoFormService.resetForm(this.editForm, schoolInfo);
  }
}
