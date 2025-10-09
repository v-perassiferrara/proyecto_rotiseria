import { TestBed } from '@angular/core/testing';

import { Valoraciones } from './valoraciones';

describe('Valoraciones', () => {
  let service: Valoraciones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Valoraciones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
