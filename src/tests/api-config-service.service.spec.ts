import { TestBed } from '@angular/core/testing';

import { ApiConfigServiceService } from './api-config-service.service';

describe('ApiConfigServiceService', () => {
  let service: ApiConfigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConfigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
