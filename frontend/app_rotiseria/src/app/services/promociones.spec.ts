import { TestBed } from '@angular/core/testing';

import { Promociones } from './promociones';

describe('Promociones', () => {
  let service: Promociones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Promociones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
