import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Base2DTutorialComponent } from './base2-dtutorial.component';

describe('Base2DTutorialComponent', () => {
  let component: Base2DTutorialComponent;
  let fixture: ComponentFixture<Base2DTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Base2DTutorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Base2DTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
