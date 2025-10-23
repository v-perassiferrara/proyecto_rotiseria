import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../../services/carrito';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    Navbar,
    Titlebar,
    CommonModule,
    RouterLink
  ],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})

// FALTA HACER TODO, SOLO LO COPIE DE DETALLE-PEDIDO
 export class Carrito implements OnInit{

  carrito: any = localStorage.getItem('carrito');
  carritoList?: any = JSON.parse(this.carrito);
  

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  carritoService = inject(CarritoService);

  calcularTotal(): number {
    let total = 0;
    if (this.carrito) {
      for (let i = 0; i < this.carritoList.length; i++) {
        total += (this.carritoList[i].precio * this.carritoList[i].cantidad);
      }  
    }
    return total;
  }

  incrementarCantidad(producto: any) {
    producto.cantidad++;
    this.actualizarCarrito();
  }

  decrementarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      this.eliminarProducto(producto);
    }
    this.actualizarCarrito();
  }

  eliminarProducto(producto: any) {
    this.carritoList = this.carritoList.filter((item: any) => item.id !== producto.id);
    this.actualizarCarrito();
  }

  actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carritoList));
  }

  confirmarPedido() {
    this.carritoService.postPedidoProducto(this.carritoList).subscribe({
      next: (response: any) => {
        console.log('Pedido creado:', response);
        alert('Pedido creado exitosamente');
        this.router.navigateByUrl("/pedidos")
      },
      error: (error) => {
        console.error('Error creating order:', error);
        alert('Error al crear el pedido');
      }
    });
  }

  ngOnInit(): void {

  }
}  


