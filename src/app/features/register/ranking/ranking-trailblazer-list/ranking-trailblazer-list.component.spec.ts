import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingTrailblazerListComponent } from './ranking-trailblazer-list.component';

describe('RankingTrailblazerListComponent', () => {
  let component: RankingTrailblazerListComponent;
  let fixture: ComponentFixture<RankingTrailblazerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingTrailblazerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingTrailblazerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
