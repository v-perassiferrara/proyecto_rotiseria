import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCategoria } from './detalle-categoria';

describe('DetalleCategoria', () => {
  let component: DetalleCategoria;
  let fixture: ComponentFixture<DetalleCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
