import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoencoderComponent } from './autoencoder.component';

describe('AutoencoderComponent', () => {
  let component: AutoencoderComponent;
  let fixture: ComponentFixture<AutoencoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoencoderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoencoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
