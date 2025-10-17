import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { ProductosService } from '../../../services/productos';
import { ActivatedRoute } from '@angular/router';
import { ValoracionesService } from '../../../services/valoraciones';
import { Usuarios } from '../../../services/usuarios';

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
  // estrellas: number[] = [];


  activatedRoute = inject(ActivatedRoute);
  productosService = inject(ProductosService);
  valoracionesService = inject(ValoracionesService);
  usuariosService = inject(Usuarios);

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
          next: (valoraciones: ValoracionResponse[]) => {
            this.valoraciones = valoraciones;
            // this.valoraciones.forEach(valoracion => {
            // this.usuario = this.usuariosService.getUsuarioPorId(valoracion.id_usuario);
            // this.estrellas = Array(valoracion.estrellas).fill(0);
            // console.log(this.valoraciones);
            // });
          },
          error: (err: any) => {
            console.error('Error al cargar las valoraciones:', err);
          }
        });

        }
    });
  }

}