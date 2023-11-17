import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISchoolInfo, NewSchoolInfo } from '../school-info.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISchoolInfo for edit and NewSchoolInfoFormGroupInput for create.
 */
type SchoolInfoFormGroupInput = ISchoolInfo | PartialWithRequiredKeyOf<NewSchoolInfo>;

type SchoolInfoFormDefaults = Pick<NewSchoolInfo, 'id'>;

type SchoolInfoFormGroupContent = {
  id: FormControl<ISchoolInfo['id'] | NewSchoolInfo['id']>;
  schoolName: FormControl<ISchoolInfo['schoolName']>;
  address: FormControl<ISchoolInfo['address']>;
  phoneNumber: FormControl<ISchoolInfo['phoneNumber']>;
  email: FormControl<ISchoolInfo['email']>;
  principalName: FormControl<ISchoolInfo['principalName']>;
  schoolDescription: FormControl<ISchoolInfo['schoolDescription']>;
};

export type SchoolInfoFormGroup = FormGroup<SchoolInfoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SchoolInfoFormService {
  createSchoolInfoFormGroup(schoolInfo: SchoolInfoFormGroupInput = { id: null }): SchoolInfoFormGroup {
    const schoolInfoRawValue = {
      ...this.getFormDefaults(),
      ...schoolInfo,
    };
    return new FormGroup<SchoolInfoFormGroupContent>({
      id: new FormControl(
        { value: schoolInfoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      schoolName: new FormControl(schoolInfoRawValue.schoolName, {
        validators: [Validators.required, Validators.maxLength(80)],
      }),
      address: new FormControl(schoolInfoRawValue.address, {
        validators: [Validators.required, Validators.maxLength(80)],
      }),
      phoneNumber: new FormControl(schoolInfoRawValue.phoneNumber, {
        validators: [Validators.required],
      }),
      email: new FormControl(schoolInfoRawValue.email),
      principalName: new FormControl(schoolInfoRawValue.principalName),
      schoolDescription: new FormControl(schoolInfoRawValue.schoolDescription),
    });
  }

  getSchoolInfo(form: SchoolInfoFormGroup): ISchoolInfo | NewSchoolInfo {
    return form.getRawValue() as ISchoolInfo | NewSchoolInfo;
  }

  resetForm(form: SchoolInfoFormGroup, schoolInfo: SchoolInfoFormGroupInput): void {
    const schoolInfoRawValue = { ...this.getFormDefaults(), ...schoolInfo };
    form.reset(
      {
        ...schoolInfoRawValue,
        id: { value: schoolInfoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SchoolInfoFormDefaults {
    return {
      id: null,
    };
  }
}
