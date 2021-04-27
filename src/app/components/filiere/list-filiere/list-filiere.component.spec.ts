import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFiliereComponent } from './list-filiere.component';

describe('ListFiliereComponent', () => {
  let component: ListFiliereComponent;
  let fixture: ComponentFixture<ListFiliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFiliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
