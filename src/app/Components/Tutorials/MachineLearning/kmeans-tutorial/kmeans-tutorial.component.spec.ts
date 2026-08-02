import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KMeansTutorialComponent } from './kmeans-tutorial.component';

describe('KMeansTutorialComponent', () => {
  let component: KMeansTutorialComponent;
  let fixture: ComponentFixture<KMeansTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [KMeansTutorialComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(KMeansTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
