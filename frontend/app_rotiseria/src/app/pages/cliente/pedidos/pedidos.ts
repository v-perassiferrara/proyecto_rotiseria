import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';
import { PedidosService } from '../../../services/pedidos';

@Component({
  selector: 'app-pedidos',
  imports: [
    Navbar,
    Titlebar,
    RouterLink
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {

  arrayPedidos: any[] = [];

  pedidosService = inject(PedidosService);

  ngOnInit(): void {
    this.pedidosService.getPedidos().subscribe({
      next: (data: any) => {
        this.arrayPedidos = data.pedidos;
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
      }
    });
  }

}
