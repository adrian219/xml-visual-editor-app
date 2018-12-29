import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOwnXmlComponent } from './add-own-xml.component';

describe('AddOwnXmlComponent', () => {
  let component: AddOwnXmlComponent;
  let fixture: ComponentFixture<AddOwnXmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOwnXmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOwnXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
