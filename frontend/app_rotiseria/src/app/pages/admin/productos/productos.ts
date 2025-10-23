import { Component, HostListener, inject, input, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { ProductosService } from '../../../services/productos';
import { CategoriasService } from '../../../services/categorias';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  imports: [
    RouterLink,
    Titlebar,
    FormsModule
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit{

  productos: any[] = [];
  productosFiltred: any[] = [];

  categorias: any[] = [];
  categoriasFiltred: any[] = [];

  currentPage: number = 1;
  totalPages: number = 1;
  isLoading: boolean = false;

  rol = input.required<string>();
  router = inject(Router);

  productosService = inject(ProductosService)
  categoriasService = inject(CategoriasService)
  

  ngOnInit(): void {
    this.loadProductos();

    this.categoriasService.getCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data.categorias || [];
        this.categoriasFiltred = [...this.categorias];
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

    this.productosService.getProductos(this.currentPage, 10).subscribe({
      next: (data: any) => {
        const newProductos = data.productos || [];
        this.productos = [...this.productos, ...newProductos];
        this.productosFiltred = [...this.productos];
        this.totalPages = data.pages || 1;
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
    if (this.nombreProducto) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && !this.isLoading && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProductos();
    }
  }

  // Para búsqueda de productos
nombreProducto!: string;

buscarProducto() {
  if (!this.nombreProducto) {
    this.productosFiltred = [...this.productos];
    return;
  }
  let nombreLower = this.nombreProducto.toLowerCase();
  this.productosFiltred = this.productos.filter((p: any) =>
    p.nombre?.toLowerCase().includes(nombreLower)
  );
}
  editarProducto(producto:any){
    console.log("Editando producto: ", producto);
    this.router.navigateByUrl(`/admin/producto/${producto.id}`);
  }

  editarCategoria(categoria:any){
    console.log("Editando categoria: ", categoria);
    this.router.navigateByUrl(`/admin/categoria/${categoria.id}`);
  }

}
