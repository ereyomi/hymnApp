import { TestBed } from '@angular/core/testing';

import { AppEnvironmentService } from './app-environment.service';

describe('AppEnvironmentService', () => {
  let service: AppEnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppEnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
