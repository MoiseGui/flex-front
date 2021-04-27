import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDispatcherComponent } from './list-dispatcher.component';

describe('ListDispatcherComponent', () => {
  let component: ListDispatcherComponent;
  let fixture: ComponentFixture<ListDispatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDispatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDispatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
