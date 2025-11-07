import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProducto } from './detalle-producto';

describe('DetalleProducto', () => {
  let component: DetalleProducto;
  let fixture: ComponentFixture<DetalleProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
