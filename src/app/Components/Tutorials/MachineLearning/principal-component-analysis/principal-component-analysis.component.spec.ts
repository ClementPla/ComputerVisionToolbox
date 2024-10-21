import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalComponentAnalysisComponent } from './principal-component-analysis.component';

describe('PrincipalComponentAnalysisComponent', () => {
  let component: PrincipalComponentAnalysisComponent;
  let fixture: ComponentFixture<PrincipalComponentAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalComponentAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalComponentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
