import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'school-info',
        data: { pageTitle: 'SchoolInfos' },
        loadChildren: () => import('./school-info/school-info.module').then(m => m.SchoolInfoModule),
      },
      {
        path: 'student',
        data: { pageTitle: 'Students' },
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
      },
      {
        path: 'relationship',
        data: { pageTitle: 'Relationships' },
        loadChildren: () => import('./relationship/relationship.module').then(m => m.RelationshipModule),
      },
      {
        path: 'teacher',
        data: { pageTitle: 'Teachers' },
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
      },
      {
        path: 'subject',
        data: { pageTitle: 'Subjects' },
        loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule),
      },
      {
        path: 'parent',
        data: { pageTitle: 'Parents' },
        loadChildren: () => import('./parent/parent.module').then(m => m.ParentModule),
      },
      {
        path: 'grade',
        data: { pageTitle: 'Grades' },
        loadChildren: () => import('./grade/grade.module').then(m => m.GradeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
