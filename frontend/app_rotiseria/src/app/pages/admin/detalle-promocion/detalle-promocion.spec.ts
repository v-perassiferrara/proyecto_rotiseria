import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePromocion } from './detalle-promocion';

describe('DetallePromocion', () => {
  let component: DetallePromocion;
  let fixture: ComponentFixture<DetallePromocion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePromocion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePromocion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
