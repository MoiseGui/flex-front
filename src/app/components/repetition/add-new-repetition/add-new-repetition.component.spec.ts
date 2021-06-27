import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRepetitionComponent } from './add-new-repetition.component';

describe('AddNewRepetitionComponent', () => {
  let component: AddNewRepetitionComponent;
  let fixture: ComponentFixture<AddNewRepetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRepetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRepetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
