import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrupdateProfesseurModalComponent } from './crupdate-professeur-modal.component';

describe('CrupdateProfesseurModalComponent', () => {
  let component: CrupdateProfesseurModalComponent;
  let fixture: ComponentFixture<CrupdateProfesseurModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrupdateProfesseurModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrupdateProfesseurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
