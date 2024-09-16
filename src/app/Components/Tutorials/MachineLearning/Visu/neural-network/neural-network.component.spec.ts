import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralNetworkComponent } from './neural-network.component';

describe('NeuralNetworkComponent', () => {
  let component: NeuralNetworkComponent;
  let fixture: ComponentFixture<NeuralNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeuralNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeuralNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
