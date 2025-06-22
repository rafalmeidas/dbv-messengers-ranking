import { TestBed } from '@angular/core/testing';

import { RankingLaunchService } from './ranking-launch.service';

describe('RankingLaunchService', () => {
  let service: RankingLaunchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingLaunchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
