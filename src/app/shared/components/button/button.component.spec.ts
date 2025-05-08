import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct variant class', () => {
    component.variant = 'outline';
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.classList).toContain('outline');
  });

  it('should emit onClick when clicked', () => {
    spyOn(component.onClick, 'emit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should not emit onClick when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    spyOn(component.onClick, 'emit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onClick.emit).not.toHaveBeenCalled();
  });

  it('should disable the button if disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });
});
