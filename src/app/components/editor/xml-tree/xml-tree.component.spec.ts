import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlTreeComponent } from './xml-tree.component';

describe('XmlTreeComponent', () => {
  let component: XmlTreeComponent;
  let fixture: ComponentFixture<XmlTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmlTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
