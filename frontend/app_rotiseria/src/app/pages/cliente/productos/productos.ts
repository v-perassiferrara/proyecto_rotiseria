import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';
import { BackButton } from '../../../components/back-button/back-button';
import { ProductosService } from '../../../services/productos';


@Component({
  selector: 'app-productos',
  imports: [
    Navbar,
    Titlebar,
    RouterLink,
    BackButton
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})

export class Productos implements OnInit {
  productos: any[] = [];

  productosService = inject(ProductosService);

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data: any) => {
        this.productos = data.productos; // <-- Cambiá esta línea
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }
}
