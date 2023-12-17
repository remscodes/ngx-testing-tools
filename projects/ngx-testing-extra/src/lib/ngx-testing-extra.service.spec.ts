import { TestBed } from '@angular/core/testing';

import { NgxTestingExtraService } from './ngx-testing-extra.service';

describe('NgxTestingExtraService', () => {
  let service: NgxTestingExtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTestingExtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
