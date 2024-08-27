import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSNRComponent } from './psnr.component';

describe('PSNRComponent', () => {
  let component: PSNRComponent;
  let fixture: ComponentFixture<PSNRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PSNRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PSNRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
