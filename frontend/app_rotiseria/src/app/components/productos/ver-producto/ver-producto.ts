import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
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

  currentPage: number = 1;
  totalPages: number = 1;
  isLoading: boolean = false;
  currentCategoriaId: number | null = null;

  route = inject(ActivatedRoute);
  router = inject(Router);
  productoService = inject(ProductosService);
  categoriasService = inject(CategoriasService);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentCategoriaId = params['categoria'] ? Number(params['categoria']) : null;
      this.currentPage = 1;
      this.arrayProductos = [];
      this.arrayFiltered = [];

      this.loadProductos();

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

  loadProductos(): void {
    if (this.isLoading) return;
    if (this.totalPages > 1 && this.currentPage > this.totalPages) return;

    this.isLoading = true;

    const request = this.currentCategoriaId
      ? this.productoService.getProductosByCategoria(this.currentCategoriaId, this.currentPage, 10)
      : this.productoService.getProductos(this.currentPage, 10);

    request.subscribe({
      next: (data: any) => {
        console.log('Respuesta del backend:', data);
        const newProductos = data.productos || [];
        this.arrayProductos = [...this.arrayProductos, ...newProductos];
        this.arrayFiltered = [...this.arrayProductos];
        this.totalPages = data.pages || 1;
        console.log(`Página ${this.currentPage} de ${this.totalPages}. Productos cargados: ${this.arrayProductos.length}`);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.nombre) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && !this.isLoading && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProductos();
    }
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

