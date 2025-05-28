import { TestBed } from '@angular/core/testing';

import { QuestionService } from './question.service';

describe('TrailblazerService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
