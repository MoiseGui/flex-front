import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFiliereComponent } from './add-filiere.component';

describe('AddFiliereComponent', () => {
  let component: AddFiliereComponent;
  let fixture: ComponentFixture<AddFiliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFiliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
