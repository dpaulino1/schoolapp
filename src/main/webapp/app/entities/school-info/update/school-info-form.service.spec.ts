import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../school-info.test-samples';

import { SchoolInfoFormService } from './school-info-form.service';

describe('SchoolInfo Form Service', () => {
  let service: SchoolInfoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolInfoFormService);
  });

  describe('Service methods', () => {
    describe('createSchoolInfoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSchoolInfoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            schoolName: expect.any(Object),
            address: expect.any(Object),
            phoneNumber: expect.any(Object),
            email: expect.any(Object),
            principalName: expect.any(Object),
            schoolDescription: expect.any(Object),
          })
        );
      });

      it('passing ISchoolInfo should create a new form with FormGroup', () => {
        const formGroup = service.createSchoolInfoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            schoolName: expect.any(Object),
            address: expect.any(Object),
            phoneNumber: expect.any(Object),
            email: expect.any(Object),
            principalName: expect.any(Object),
            schoolDescription: expect.any(Object),
          })
        );
      });
    });

    describe('getSchoolInfo', () => {
      it('should return NewSchoolInfo for default SchoolInfo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createSchoolInfoFormGroup(sampleWithNewData);

        const schoolInfo = service.getSchoolInfo(formGroup) as any;

        expect(schoolInfo).toMatchObject(sampleWithNewData);
      });

      it('should return NewSchoolInfo for empty SchoolInfo initial value', () => {
        const formGroup = service.createSchoolInfoFormGroup();

        const schoolInfo = service.getSchoolInfo(formGroup) as any;

        expect(schoolInfo).toMatchObject({});
      });

      it('should return ISchoolInfo', () => {
        const formGroup = service.createSchoolInfoFormGroup(sampleWithRequiredData);

        const schoolInfo = service.getSchoolInfo(formGroup) as any;

        expect(schoolInfo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISchoolInfo should not enable id FormControl', () => {
        const formGroup = service.createSchoolInfoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSchoolInfo should disable id FormControl', () => {
        const formGroup = service.createSchoolInfoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
