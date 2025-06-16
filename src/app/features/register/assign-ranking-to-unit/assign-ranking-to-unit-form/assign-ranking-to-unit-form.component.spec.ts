import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRankingToUnitFormComponent } from './assign-ranking-to-unit-form.component';

describe('AssignRankingToUnitFormComponent', () => {
  let component: AssignRankingToUnitFormComponent;
  let fixture: ComponentFixture<AssignRankingToUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignRankingToUnitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRankingToUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
