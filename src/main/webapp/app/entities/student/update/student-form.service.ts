import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStudent, NewStudent } from '../student.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStudent for edit and NewStudentFormGroupInput for create.
 */
type StudentFormGroupInput = IStudent | PartialWithRequiredKeyOf<NewStudent>;

type StudentFormDefaults = Pick<NewStudent, 'id'>;

type StudentFormGroupContent = {
  id: FormControl<IStudent['id'] | NewStudent['id']>;
  firstName: FormControl<IStudent['firstName']>;
  lastName: FormControl<IStudent['lastName']>;
  dateOfBirth: FormControl<IStudent['dateOfBirth']>;
  gender: FormControl<IStudent['gender']>;
  phoneNumber: FormControl<IStudent['phoneNumber']>;
  address: FormControl<IStudent['address']>;
};

export type StudentFormGroup = FormGroup<StudentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StudentFormService {
  createStudentFormGroup(student: StudentFormGroupInput = { id: null }): StudentFormGroup {
    const studentRawValue = {
      ...this.getFormDefaults(),
      ...student,
    };
    return new FormGroup<StudentFormGroupContent>({
      id: new FormControl(
        { value: studentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      firstName: new FormControl(studentRawValue.firstName, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      lastName: new FormControl(studentRawValue.lastName, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      dateOfBirth: new FormControl(studentRawValue.dateOfBirth),
      gender: new FormControl(studentRawValue.gender, {
        validators: [Validators.minLength(1), Validators.maxLength(1)],
      }),
      phoneNumber: new FormControl(studentRawValue.phoneNumber),
      address: new FormControl(studentRawValue.address),
    });
  }

  getStudent(form: StudentFormGroup): IStudent | NewStudent {
    return form.getRawValue() as IStudent | NewStudent;
  }

  resetForm(form: StudentFormGroup, student: StudentFormGroupInput): void {
    const studentRawValue = { ...this.getFormDefaults(), ...student };
    form.reset(
      {
        ...studentRawValue,
        id: { value: studentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StudentFormDefaults {
    return {
      id: null,
    };
  }
}
