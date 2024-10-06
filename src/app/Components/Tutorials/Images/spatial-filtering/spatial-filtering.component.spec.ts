import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpatialFilteringComponent } from './spatial-filtering.component';

describe('SpatialFilteringComponent', () => {
  let component: SpatialFilteringComponent;
  let fixture: ComponentFixture<SpatialFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SpatialFilteringComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
