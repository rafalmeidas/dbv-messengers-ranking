import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PioneerComponent } from './pioneer.component';

describe('PioneerComponent', () => {
  let component: PioneerComponent;
  let fixture: ComponentFixture<PioneerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PioneerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PioneerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
