import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrupdateProfileModalComponent } from './crupdate-profile-modal.component';

describe('CrupdateProfileModalComponent', () => {
  let component: CrupdateProfileModalComponent;
  let fixture: ComponentFixture<CrupdateProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrupdateProfileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrupdateProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
