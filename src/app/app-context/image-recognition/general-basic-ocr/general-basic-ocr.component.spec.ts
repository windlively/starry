import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBasicOcrComponent } from './general-basic-ocr.component';

describe('GeneralOcrComponent', () => {
  let component: GeneralBasicOcrComponent;
  let fixture: ComponentFixture<GeneralBasicOcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralBasicOcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBasicOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
