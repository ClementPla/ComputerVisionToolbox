import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KernelElementComponent } from './kernel-element.component';

describe('KernelElementComponent', () => {
  let component: KernelElementComponent;
  let fixture: ComponentFixture<KernelElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [KernelElementComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KernelElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
