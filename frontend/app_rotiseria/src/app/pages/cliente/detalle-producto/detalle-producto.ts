import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { ProductosService } from '../../../services/productos';
import { ActivatedRoute } from '@angular/router';
import { ValoracionesService } from '../../../services/valoraciones';
import { UsuariosService } from '../../../services/usuarios';
import { CarritoService } from '../../../services/carrito';

@Component({
  selector: 'app-detalle-producto',
  imports: [
      Navbar,
      Titlebar,
      BackButton
  ],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css'
})
export class DetalleProducto implements OnInit {

  producto: any;
  usuario: any;
  valoraciones: any[] = [];


  getStarArray(estrellas: number): number[] {
    return Array(5).fill(0).map((_, i) => i < estrellas ? 1 : 0);
  }

  agregarAlCarrito() {
    const producto = this.producto;
    const usuario = this.usuario;

    this.carritoService.agregarProducto(producto);
    alert(`Producto "${producto.nombre}" agregado al carrito.`);
  
  }


  activatedRoute = inject(ActivatedRoute);
  productosService = inject(ProductosService);
  valoracionesService = inject(ValoracionesService);
  usuariosService = inject(UsuariosService);
  carritoService = inject(CarritoService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productoId = params['id'];
      if (productoId) {
        this.productosService.getProducto(productoId).subscribe({
          next: (producto: ProductoResponse) => {
            this.producto = producto;
          },
          error: (err: any) => {
            console.error('Error al cargar el producto:', err);
          }
        });
        

        this.valoracionesService.getValoracionesPorProducto(productoId).subscribe({
          next: (data: any) => {
            for (let i = 0; i < data.valoraciones.length; i++) {
              let valoracion = data.valoraciones[i];
              this.valoraciones.push(valoracion);
            }
            // // this.estrellas = Array(valoracion.estrellas).fill(0);
          },
          error: (err: any) => {
            console.error('Error al cargar las valoraciones:', err);
          }
        });

      }
    });
  }

}