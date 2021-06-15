import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddneweventComponent } from './addnewevent.component';

describe('AddneweventComponent', () => {
  let component: AddneweventComponent;
  let fixture: ComponentFixture<AddneweventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddneweventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddneweventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
