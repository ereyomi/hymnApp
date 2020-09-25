import { TestBed } from '@angular/core/testing';

import { HymysApiService } from './hymys-api.service';

describe('HymysApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HymysApiService = TestBed.get(HymysApiService);
    expect(service).toBeTruthy();
  });
});
