import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingButtonsComponent } from './loading-buttons.component';

describe('LoadingButtonsComponent', () => {
  let component: LoadingButtonsComponent;
  let fixture: ComponentFixture<LoadingButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
