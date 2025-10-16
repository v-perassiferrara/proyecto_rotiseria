import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';
import { ProductosService } from '../../../services/productos';
import { CategoriasService } from '../../../services/categorias';

@Component({
  selector: 'app-home',
  imports: [
    Navbar,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  productos: any[] = [];
  categorias: any[] = [];
  top3: any[] = [];

  authService = inject(Auth);

  productoSvc = inject(ProductosService)
  categoriaSvc = inject(CategoriasService)

  constructor(private router: Router) {}



  // Usar OnInit es esencial cuando se implementa ngOnInit
  ngOnInit(): void {

    // Le decimos a Angular que esperamos la estructura ProductosResponse
    this.productoSvc.getProductosTop3().subscribe({
      next: (data) => {
        // Asignamos el array de productos de la respuesta a top3
        this.top3 = data.productos;
        console.log("Productos Top 3 cargados:", this.top3);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    })


    this.categoriaSvc.getCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data.categorias;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  goToProductosAndFocusSearch(): void {
    this.router.navigate(['/productos'], { queryParams: { focusSearch: 'true' } });
  }
}