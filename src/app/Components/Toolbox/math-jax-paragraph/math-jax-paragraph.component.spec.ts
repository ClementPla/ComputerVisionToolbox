import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathJaxParagraphComponent } from './math-jax-paragraph.component';

describe('MathJaxParagraphComponent', () => {
  let component: MathJaxParagraphComponent;
  let fixture: ComponentFixture<MathJaxParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathJaxParagraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathJaxParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
