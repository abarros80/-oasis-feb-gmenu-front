import { TestBed } from '@angular/core/testing';

import { RestauranteCrudService } from './restaurante-crud.service';

describe('RestauranteCrudService', () => {
  let service: RestauranteCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestauranteCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
