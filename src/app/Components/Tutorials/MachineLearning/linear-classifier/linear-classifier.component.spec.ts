import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearClassifierComponent } from './linear-classifier.component';

describe('LinearClassifierComponent', () => {
  let component: LinearClassifierComponent;
  let fixture: ComponentFixture<LinearClassifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LinearClassifierComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(LinearClassifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
