import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISchoolInfo } from '../school-info.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../school-info.test-samples';

import { SchoolInfoService } from './school-info.service';

const requireRestSample: ISchoolInfo = {
  ...sampleWithRequiredData,
};

describe('SchoolInfo Service', () => {
  let service: SchoolInfoService;
  let httpMock: HttpTestingController;
  let expectedResult: ISchoolInfo | ISchoolInfo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SchoolInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a SchoolInfo', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const schoolInfo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(schoolInfo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SchoolInfo', () => {
      const schoolInfo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(schoolInfo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SchoolInfo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SchoolInfo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SchoolInfo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSchoolInfoToCollectionIfMissing', () => {
      it('should add a SchoolInfo to an empty array', () => {
        const schoolInfo: ISchoolInfo = sampleWithRequiredData;
        expectedResult = service.addSchoolInfoToCollectionIfMissing([], schoolInfo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(schoolInfo);
      });

      it('should not add a SchoolInfo to an array that contains it', () => {
        const schoolInfo: ISchoolInfo = sampleWithRequiredData;
        const schoolInfoCollection: ISchoolInfo[] = [
          {
            ...schoolInfo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSchoolInfoToCollectionIfMissing(schoolInfoCollection, schoolInfo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SchoolInfo to an array that doesn't contain it", () => {
        const schoolInfo: ISchoolInfo = sampleWithRequiredData;
        const schoolInfoCollection: ISchoolInfo[] = [sampleWithPartialData];
        expectedResult = service.addSchoolInfoToCollectionIfMissing(schoolInfoCollection, schoolInfo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(schoolInfo);
      });

      it('should add only unique SchoolInfo to an array', () => {
        const schoolInfoArray: ISchoolInfo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const schoolInfoCollection: ISchoolInfo[] = [sampleWithRequiredData];
        expectedResult = service.addSchoolInfoToCollectionIfMissing(schoolInfoCollection, ...schoolInfoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const schoolInfo: ISchoolInfo = sampleWithRequiredData;
        const schoolInfo2: ISchoolInfo = sampleWithPartialData;
        expectedResult = service.addSchoolInfoToCollectionIfMissing([], schoolInfo, schoolInfo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(schoolInfo);
        expect(expectedResult).toContain(schoolInfo2);
      });

      it('should accept null and undefined values', () => {
        const schoolInfo: ISchoolInfo = sampleWithRequiredData;
        expectedResult = service.addSchoolInfoToCollectionIfMissing([], null, schoolInfo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(schoolInfo);
      });

      it('should return initial array if no SchoolInfo is added', () => {
        const schoolInfoCollection: ISchoolInfo[] = [sampleWithRequiredData];
        expectedResult = service.addSchoolInfoToCollectionIfMissing(schoolInfoCollection, undefined, null);
        expect(expectedResult).toEqual(schoolInfoCollection);
      });
    });

    describe('compareSchoolInfo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSchoolInfo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSchoolInfo(entity1, entity2);
        const compareResult2 = service.compareSchoolInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSchoolInfo(entity1, entity2);
        const compareResult2 = service.compareSchoolInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSchoolInfo(entity1, entity2);
        const compareResult2 = service.compareSchoolInfo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
