import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SVMClassifierComponent } from './svmclassifier.component';

describe('SVMClassifierComponent', () => {
  let component: SVMClassifierComponent;
  let fixture: ComponentFixture<SVMClassifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SVMClassifierComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SVMClassifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
