import { TestBed } from '@angular/core/testing';

import { CallserviceService } from './callservice.service';

describe('CallserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallserviceService = TestBed.get(CallserviceService);
    expect(service).toBeTruthy();
  });
});
