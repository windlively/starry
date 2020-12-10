import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitConvertComponent } from './unit-convert.component';

describe('UnitConvertComponent', () => {
  let component: UnitConvertComponent;
  let fixture: ComponentFixture<UnitConvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitConvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
