import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardSummaryComponent } from './reward-summary.component';

describe('RewardSummaryComponent', () => {
  let component: RewardSummaryComponent;
  let fixture: ComponentFixture<RewardSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
