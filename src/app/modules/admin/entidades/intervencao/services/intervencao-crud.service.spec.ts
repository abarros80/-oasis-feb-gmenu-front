import { TestBed } from '@angular/core/testing';

import { IntervencaoCrudService } from './intervencao-crud.service';

describe('IntervencaoCrudService', () => {
  let service: IntervencaoCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervencaoCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
