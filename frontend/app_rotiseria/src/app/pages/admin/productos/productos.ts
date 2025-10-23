import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { ProductosService } from '../../../services/productos';
import { CategoriasService } from '../../../services/categorias';

@Component({
  selector: 'app-productos',
  imports: [
    RouterLink,
    Titlebar
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit{

  productos: any[] = [];
  productosFiltred: any[] = [];
  categorias: any[] = [];
  categoriasFiltred: any[] = [];
  rol = input.required<string>();
  router = inject(Router);
  
  productosService = inject(ProductosService)
  categoriasService = inject(CategoriasService)
  

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(productos => {
      this.productos = productos
    })
    this.categoriasService.getCategorias().subscribe(categorias => {
      this.categorias = categorias
    })
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

// Para búsqueda de categorías
nombreCategoria!: string;

buscarCategoria() {
  if (!this.nombreCategoria) {
    this.categoriasFiltred = [...this.categorias];
    return;
  }
  let nombreLower = this.nombreCategoria.toLowerCase();
  this.categoriasFiltred = this.categorias.filter((c: any) =>
    c.nombre?.toLowerCase().includes(nombreLower)
  );
}

}
