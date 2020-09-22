import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardSummaryComponent } from './reward-summary.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('RewardSummaryComponent', () => {
  let component: RewardSummaryComponent;
  let fixture: ComponentFixture<RewardSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ RewardSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
