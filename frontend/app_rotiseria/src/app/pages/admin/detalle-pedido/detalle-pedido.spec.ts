import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePedido } from './detalle-pedido';

describe('DetallePedido', () => {
  let component: DetallePedido;
  let fixture: ComponentFixture<DetallePedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
