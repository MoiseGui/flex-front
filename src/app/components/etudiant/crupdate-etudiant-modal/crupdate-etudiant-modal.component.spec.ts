import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrupdateEtudiantModalComponent } from './crupdate-etudiant-modal.component';

describe('CrupdateEtudiantModalComponent', () => {
  let component: CrupdateEtudiantModalComponent;
  let fixture: ComponentFixture<CrupdateEtudiantModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrupdateEtudiantModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrupdateEtudiantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
