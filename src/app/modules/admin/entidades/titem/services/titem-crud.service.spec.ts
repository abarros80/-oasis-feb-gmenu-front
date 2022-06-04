import { TestBed } from '@angular/core/testing';

import { TitemCrudService } from './titem-crud.service';

describe('TitemCrudService', () => {
  let service: TitemCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitemCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
