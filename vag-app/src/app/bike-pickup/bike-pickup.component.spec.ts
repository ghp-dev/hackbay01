import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikePickupComponent } from './bike-pickup.component';

describe('BikePickupComponent', () => {
  let component: BikePickupComponent;
  let fixture: ComponentFixture<BikePickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikePickupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikePickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
