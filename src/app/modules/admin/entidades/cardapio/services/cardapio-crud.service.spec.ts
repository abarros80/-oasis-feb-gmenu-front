import { TestBed } from '@angular/core/testing';

import { CardapioCrudService } from './cardapio-crud.service';

describe('CardapioCrudService', () => {
  let service: CardapioCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardapioCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
