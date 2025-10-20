import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '../../../services/pedidos';

@Component({
  selector: 'app-detalle-pedido',
  imports: [
      Navbar,
      Titlebar,
      BackButton
  ],
  templateUrl: './detalle-pedido.html',
  styleUrl: './detalle-pedido.css'
})
export class DetallePedido implements OnInit {

  pedido: any = null;
  
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  pedidosService = inject(PedidosService);

  calcularTotal(): number {
    if (!this.pedido || !this.pedido.productos) {
      return 0;
    }
    let total = 0;
    let productos = this.pedido.productos;
    for (let i = 0; i < productos.length; i++) {
      total += productos[i].precio * productos[i].cantidad;
    }
    return total;
  }

  cancelarPedido(){
    this.pedidosService.cancelarPedido(this.pedido.id).subscribe({
      next: (pedido: PedidoResponse) => {
        this.pedido = pedido;
        console.log('Pedido cancelado con éxito');
        // Recarga la página para actualizar el estado del pedido
        this.router.navigateByUrl('/pedidos');
      },
      error: (err: any) => {
        console.error('Error al cancelar el pedido:', err);
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const pedidoId = params['id'];
      if (pedidoId) {
        this.pedidosService.getPedidoCompleto(pedidoId).subscribe({
          next: (pedido: PedidoResponse) => {
            this.pedido = pedido;

          },
          error: (err: any) => {
            console.error('Error al cargar el producto:', err);
          }
        });
      }});
  }
}
