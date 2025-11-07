import { Component, HostListener, inject, OnInit } from '@angular/core';
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
  currentPage: number = 1;
  totalPages: number = 1;
  isLoading: boolean = false;

  pedidosService = inject(PedidosService);

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
