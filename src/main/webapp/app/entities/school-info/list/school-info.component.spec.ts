import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SchoolInfoService } from '../service/school-info.service';

import { SchoolInfoComponent } from './school-info.component';

describe('SchoolInfo Management Component', () => {
  let comp: SchoolInfoComponent;
  let fixture: ComponentFixture<SchoolInfoComponent>;
  let service: SchoolInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'school-info', component: SchoolInfoComponent }]), HttpClientTestingModule],
      declarations: [SchoolInfoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(SchoolInfoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SchoolInfoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SchoolInfoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.schoolInfos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to schoolInfoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getSchoolInfoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getSchoolInfoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
