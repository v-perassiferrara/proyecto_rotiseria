import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { PedidosService } from '../../../services/pedidos';

@Component({
  selector: 'app-pedidos',
  imports: [
    RouterLink,
    Titlebar

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
  totalPendientes = 0;
  totalPreparacion = 0;
  totalListos = 0;
  totalEntregados = 0;
  totalCancelados = 0;

  calcularTotalProductos(): void {
    this.totalPendientes = 0;
    this.totalPreparacion = 0;
    this.totalListos = 0;
    this.totalEntregados = 0;
    this.totalCancelados = 0;

    // fuente de elementos: preferir verProductoComponents si existe
    const source: any[] = Array.isArray((this as any).verProductoComponents)
      ? (this as any).verProductoComponents
      : this.arrayPedidos.flatMap(p => p.productos || []);

    source.forEach((item: any) => {
      const estado = (item.estado ?? '').toString().trim().toLowerCase();
      // Normaliza diferentes nombres de cantidad posibles
      const cantidad = Number(item.cantidadUsuarios ?? item.cantidad ?? item.quantity ?? 0) || 0;

      switch (estado) {
        case 'pendiente':
        case 'pendientes':
          this.totalPendientes += cantidad;
          break;
        case 'preparacion':
        case 'en preparación':
        case 'preparación':
          this.totalPreparacion += cantidad;
          break;
        case 'listo':
        case 'listos':
          this.totalListos += cantidad;
          break;
        case 'entregado':
        case 'entregados':
          this.totalEntregados += cantidad;
          break;
        case 'cancelado':
        case 'cancelados':
          this.totalCancelados += cantidad;
          break;
        default:
          break;
      }
    });
  }
  
  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    if (this.isLoading) return;
    if (this.totalPages > 1 && this.currentPage > this.totalPages) return;

    this.isLoading = true;

    this.pedidosService.getPedidos(this.currentPage, 10).subscribe({
      next: (data: any) => {
        const newPedidos = data.pedidos || [];
        this.arrayPedidos = [...this.arrayPedidos, ...newPedidos];
        this.totalPages = data.pages || 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
        this.isLoading = false;
      }
    });
  }

  editarPedido(pedido:any){
    this.router.navigateByUrl(`/admin/detalle-pedido/${pedido.id}`);
  }

  

  // 
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
