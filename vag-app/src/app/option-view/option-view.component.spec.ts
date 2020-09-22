import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionViewComponent } from './option-view.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('OptionViewComponent', () => {
  let component: OptionViewComponent;
  let fixture: ComponentFixture<OptionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ OptionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
