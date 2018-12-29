import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnXmlsComponent } from './own-xmls.component';

describe('OwnXmlsComponent', () => {
  let component: OwnXmlsComponent;
  let fixture: ComponentFixture<OwnXmlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnXmlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnXmlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
