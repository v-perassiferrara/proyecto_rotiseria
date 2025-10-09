import { TestBed } from '@angular/core/testing';

import { Pedidos } from './pedidos';

describe('Pedidos', () => {
  let service: Pedidos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pedidos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
