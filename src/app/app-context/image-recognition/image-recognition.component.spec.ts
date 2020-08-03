import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRecognitionComponent } from './image-recognition.component';

describe('ImageRecognitionComponent', () => {
  let component: ImageRecognitionComponent;
  let fixture: ComponentFixture<ImageRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
