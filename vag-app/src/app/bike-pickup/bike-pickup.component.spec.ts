import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikePickupComponent } from './bike-pickup.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('BikePickupComponent', () => {
  let component: BikePickupComponent;
  let fixture: ComponentFixture<BikePickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
