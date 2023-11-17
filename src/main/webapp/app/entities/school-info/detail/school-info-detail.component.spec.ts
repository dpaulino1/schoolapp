import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchoolInfoDetailComponent } from './school-info-detail.component';

describe('SchoolInfo Management Detail Component', () => {
  let comp: SchoolInfoDetailComponent;
  let fixture: ComponentFixture<SchoolInfoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolInfoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ schoolInfo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SchoolInfoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SchoolInfoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load schoolInfo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.schoolInfo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
