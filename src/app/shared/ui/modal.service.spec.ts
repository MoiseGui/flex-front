import { TestBed } from '@angular/core/testing';

import { Modal } from './modal.service';

describe('Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Modal = TestBed.get(Modal);
    expect(service).toBeTruthy();
  });
});
