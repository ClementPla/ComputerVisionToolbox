import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorphoToolsComponent } from './morpho-tools.component';

describe('MorphoToolsComponent', () => {
  let component: MorphoToolsComponent;
  let fixture: ComponentFixture<MorphoToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorphoToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorphoToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
