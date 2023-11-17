import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISchoolInfo } from '../school-info.model';

@Component({
  selector: 'jhi-school-info-detail',
  templateUrl: './school-info-detail.component.html',
})
export class SchoolInfoDetailComponent implements OnInit {
  schoolInfo: ISchoolInfo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ schoolInfo }) => {
      this.schoolInfo = schoolInfo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
