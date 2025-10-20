import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../../services/pedidos';

@Component({
  selector: 'app-carrito',
  imports: [
    Navbar,
    Titlebar
  ],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
// FALTA HACER TODO, SOLO LO COPIE DE DETALLE-PEDIDO
 export class Carrito implements OnInit{
  pedido: any = null;

  activatedRoute = inject(ActivatedRoute);
  pedidosService = inject(PedidosService);

  calcularTotal(): number {
    let total = 0;
    let productos = this.pedido.productos;
    for (let i = 0; i < productos.length; i++) {
      total += productos[i].precio * productos[i].cantidad;
    }
    return total;
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


