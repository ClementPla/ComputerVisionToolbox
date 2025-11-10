import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussianComponent } from './gaussian.component';

describe('GaussianComponent', () => {
  let component: GaussianComponent;
  let fixture: ComponentFixture<GaussianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GaussianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaussianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
