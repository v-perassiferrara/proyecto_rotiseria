import { Component, inject, OnInit} from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';
import { ProductosService } from '../../../services/productos';

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

  top3: any[] = [];

  authService = inject(Auth);
  productoSvc = inject(ProductosService)



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
    });
  }
}