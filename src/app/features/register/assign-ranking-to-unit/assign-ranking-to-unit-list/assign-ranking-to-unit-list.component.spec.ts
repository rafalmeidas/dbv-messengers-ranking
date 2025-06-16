import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRankingToUnitListComponent } from './assign-ranking-to-unit-list.component';

describe('AssignRankingToUnitListComponent', () => {
  let component: AssignRankingToUnitListComponent;
  let fixture: ComponentFixture<AssignRankingToUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignRankingToUnitListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRankingToUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
