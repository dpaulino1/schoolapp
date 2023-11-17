import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SchoolInfoFormService } from './school-info-form.service';
import { SchoolInfoService } from '../service/school-info.service';
import { ISchoolInfo } from '../school-info.model';

import { SchoolInfoUpdateComponent } from './school-info-update.component';

describe('SchoolInfo Management Update Component', () => {
  let comp: SchoolInfoUpdateComponent;
  let fixture: ComponentFixture<SchoolInfoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let schoolInfoFormService: SchoolInfoFormService;
  let schoolInfoService: SchoolInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SchoolInfoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(SchoolInfoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SchoolInfoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    schoolInfoFormService = TestBed.inject(SchoolInfoFormService);
    schoolInfoService = TestBed.inject(SchoolInfoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const schoolInfo: ISchoolInfo = { id: 456 };

      activatedRoute.data = of({ schoolInfo });
      comp.ngOnInit();

      expect(comp.schoolInfo).toEqual(schoolInfo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISchoolInfo>>();
      const schoolInfo = { id: 123 };
      jest.spyOn(schoolInfoFormService, 'getSchoolInfo').mockReturnValue(schoolInfo);
      jest.spyOn(schoolInfoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ schoolInfo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: schoolInfo }));
      saveSubject.complete();

      // THEN
      expect(schoolInfoFormService.getSchoolInfo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(schoolInfoService.update).toHaveBeenCalledWith(expect.objectContaining(schoolInfo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISchoolInfo>>();
      const schoolInfo = { id: 123 };
      jest.spyOn(schoolInfoFormService, 'getSchoolInfo').mockReturnValue({ id: null });
      jest.spyOn(schoolInfoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ schoolInfo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: schoolInfo }));
      saveSubject.complete();

      // THEN
      expect(schoolInfoFormService.getSchoolInfo).toHaveBeenCalled();
      expect(schoolInfoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISchoolInfo>>();
      const schoolInfo = { id: 123 };
      jest.spyOn(schoolInfoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ schoolInfo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(schoolInfoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
