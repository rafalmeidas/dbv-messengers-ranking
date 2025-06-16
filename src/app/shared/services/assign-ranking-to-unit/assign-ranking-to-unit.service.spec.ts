import { TestBed } from '@angular/core/testing';

import { AssignRankingToUnitService } from './assign-ranking-to-unit.service';

describe('AssignRankingToUnitService', () => {
  let service: AssignRankingToUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignRankingToUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
