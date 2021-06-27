import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddperiodeComponent } from './addperiode.component';

describe('AddperiodeComponent', () => {
  let component: AddperiodeComponent;
  let fixture: ComponentFixture<AddperiodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddperiodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddperiodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
