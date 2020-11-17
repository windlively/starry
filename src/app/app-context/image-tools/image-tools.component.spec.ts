import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageToolsComponent } from './image-tools.component';

describe('ImageToolsComponent', () => {
  let component: ImageToolsComponent;
  let fixture: ComponentFixture<ImageToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
