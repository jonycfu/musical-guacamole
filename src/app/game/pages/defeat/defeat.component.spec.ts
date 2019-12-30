import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefeatComponent } from './defeat.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DefeatComponent', () => {
  let component: DefeatComponent;
  let fixture: ComponentFixture<DefeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefeatComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
