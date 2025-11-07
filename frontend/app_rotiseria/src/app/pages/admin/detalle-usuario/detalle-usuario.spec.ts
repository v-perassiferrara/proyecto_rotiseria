import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUsuario } from './detalle-usuario';

describe('DetalleUsuario', () => {
  let component: DetalleUsuario;
  let fixture: ComponentFixture<DetalleUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
