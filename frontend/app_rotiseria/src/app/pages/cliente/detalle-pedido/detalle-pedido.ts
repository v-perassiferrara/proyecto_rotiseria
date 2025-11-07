import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from '../../../services/pedidos';
import { ValoracionAbm } from '../../../components/valoraciones/abm/abm';

@Component({
  selector: 'app-detalle-pedido',
  imports: [
      Navbar,
      Titlebar,
      BackButton,
      ValoracionAbm
  ],
  templateUrl: './detalle-pedido.html',
  styleUrl: './detalle-pedido.css'
})
export class DetallePedido implements OnInit {

  pedido: any = null;
  isValoracionModalVisible = false;
  productoSeleccionado: any = null;
  
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  pedidosService = inject(PedidosService);

  abrirModalValoracion(producto: any) {
    this.productoSeleccionado = producto;
    this.isValoracionModalVisible = true;
  }

  cerrarModalValoracion() {
    this.isValoracionModalVisible = false;
    this.productoSeleccionado = null;
  }

  cancelarPedido(){
    this.pedidosService.cancelarPedido(this.pedido.id).subscribe({
      next: (response: any) => {
        this.pedido.estado = 'cancelado';
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
          next: (pedido: any) => {
            this.pedido = pedido;

          },
          error: (err: any) => {
            console.error('Error al cargar el producto:', err);
          }
        });
      }});
  }
}
