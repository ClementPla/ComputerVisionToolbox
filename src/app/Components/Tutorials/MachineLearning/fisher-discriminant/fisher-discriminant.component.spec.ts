import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisherDiscriminantComponent } from './fisher-discriminant.component';

describe('FisherDiscriminantComponent', () => {
  let component: FisherDiscriminantComponent;
  let fixture: ComponentFixture<FisherDiscriminantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FisherDiscriminantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FisherDiscriminantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
