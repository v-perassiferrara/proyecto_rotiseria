import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriasService } from '../../../services/categorias';
import { ProductosService } from '../../../services/productos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-producto',
  imports: [FormsModule, RouterLink],
  templateUrl: './ver-producto.html',
  styleUrl: './ver-producto.css'
})
export class VerProducto implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef;

  nombre!: string;

  arrayProductos: any[] = [];
  arrayFiltered: any[] = [];

  categorias: any[] = [];

  route = inject(ActivatedRoute);
  router = inject(Router);
  productoService = inject(ProductosService);
  categoriasService = inject(CategoriasService);

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const categoriaId = params['categoria'];
      if (categoriaId) {
        this.productoService.getProductosByCategoria(categoriaId).subscribe({
          next: (data: any) => {
            this.arrayProductos = data.productos;

            this.arrayProductos = this.arrayProductos.sort()

            this.arrayFiltered = [...this.arrayProductos]
          },
          error: (err) => {
            console.error('Error al cargar productos por categoría:', err);
          }
        });
      } else {
        this.productoService.getProductos().subscribe({
          next: (res: any) => {
            this.arrayProductos = res.productos;

            this.arrayProductos = this.arrayProductos.sort()

            this.arrayFiltered = [...this.arrayProductos]
          },
          error: (err) => {
            console.log("Error al traer usuarios: ", err);
          }
        })
      }

      if (params['focusSearch'] === 'true') {
        setTimeout(() => {
          this.searchInput.nativeElement.focus();
        });
      }
    });

    this.categoriasService.getCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data.categorias;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }


  mostrarTodos(): void {
    this.router.navigateByUrl('/productos');
  }

  getProductosByCategoria(categoriaId: number): void {
    this.router.navigateByUrl(`/productos?categoria=${categoriaId}`);
  }

  buscar() {
    if (!this.nombre) {
      this.arrayFiltered = [...this.arrayProductos];
      return;
    }
    let nombreLower = this.nombre.toLowerCase();
    this.arrayFiltered = this.arrayProductos.filter((p: any) =>
      p.nombre?.toLowerCase().includes(nombreLower)
    );
  }

}

