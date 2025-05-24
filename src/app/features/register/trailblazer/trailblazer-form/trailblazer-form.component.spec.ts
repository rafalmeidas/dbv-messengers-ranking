import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailblazerFormComponent } from './trailblazer-form.component';

describe('TrailblazerFormComponent', () => {
  let component: TrailblazerFormComponent;
  let fixture: ComponentFixture<TrailblazerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailblazerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailblazerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
