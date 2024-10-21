import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNNComponent } from './cnn.component';

describe('CNNComponent', () => {
  let component: CNNComponent;
  let fixture: ComponentFixture<CNNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CNNComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CNNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
