import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailblazerListComponent } from './trailblazer-list.component';

describe('TrailblazerListComponent', () => {
  let component: TrailblazerListComponent;
  let fixture: ComponentFixture<TrailblazerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailblazerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailblazerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
