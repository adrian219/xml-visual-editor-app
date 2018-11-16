import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlInputComponent } from './xml-input.component';

describe('XmlInputComponent', () => {
  let component: XmlInputComponent;
  let fixture: ComponentFixture<XmlInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmlInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
