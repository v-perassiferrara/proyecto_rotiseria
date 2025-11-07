import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { PedidosService } from '../../../services/pedidos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  imports: [
    Titlebar,
    FormsModule
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {

  router = inject(Router)
  arrayPedidos: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  isLoading: boolean = false;

  pedidosService = inject(PedidosService);
  // totales por estado
  pendiente = 0;
  preparacion = 0;
  listo = 0;
  entregado = 0;
  cancelado = 0;

  pedidosFiltered: any[] = [];

  calcularTotalPedidos(): void {    
    this.pedidosService.cantidadPedidos().subscribe((data: any) => {
      this.pendiente = data['pendiente'];
      this.preparacion = data['preparacion'];
      this.listo = data['listo'];
      this.entregado = data['entregado'];      
      this.cancelado = data['cancelado'];
  });}

  loadPedidos(): void {
    if (this.isLoading) return;
    if (this.totalPages > 1 && this.currentPage > this.totalPages) return;

    this.isLoading = true;

    this.pedidosService.getPedidos(this.currentPage, 10).subscribe({
      next: (data: any) => {
        const newPedidos = data.pedidos || [];
        this.arrayPedidos = [...this.arrayPedidos, ...newPedidos];
        this.pedidosFiltered = [...this.arrayPedidos];
        this.totalPages = data.pages || 1;
        this.isLoading = false;
        this.calcularTotalPedidos();
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.loadPedidos();
  }

  editarPedido(pedido:any){
    this.router.navigateByUrl(`/admin/detalle-pedido/${pedido.id}`);
  }

  // Para búsqueda de productos
  numeroPedido!: number;

  buscarPedido() {
    if (!this.numeroPedido) {
      this.pedidosFiltered = [...this.arrayPedidos];
      return;
    }
    this.pedidosFiltered = this.arrayPedidos.filter((p: any) =>
      p.id == this.numeroPedido
    );
  }

  mostrarTodos(): void {
    this.pedidosFiltered = [...this.arrayPedidos];
  }

  filtrarPorEstado(estado: string) {
    this.pedidosService.getPedidosByEstado(estado).subscribe({
      next: (data: any) => {
        this.pedidosFiltered = data.pedidos || [];
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
      }
      });
  }

  
  // cuando el usuario llega al final de un paginate, trae mas
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && !this.isLoading && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPedidos();
    }
  }
}
