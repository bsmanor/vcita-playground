import { TestBed } from '@angular/core/testing';

import { VcitaApiService } from './vcita-api.service';

describe('VcitaApiService', () => {
  let service: VcitaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcitaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
