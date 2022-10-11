import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralElementComponent } from './structural-element.component';

describe('StructuralElementComponent', () => {
  let component: StructuralElementComponent;
  let fixture: ComponentFixture<StructuralElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructuralElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructuralElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
