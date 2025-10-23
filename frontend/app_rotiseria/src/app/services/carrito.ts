import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private storageKey = 'carrito';
  private http = inject(HttpClient);
  url = environment.apiUrl;
  authService = inject(Auth);

  // Crear pedido y luego los productos
  postPedidoProducto(carrito: any[]): void {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.postPedido(carrito).subscribe({
      next: (respuestaPedido: any) => {
        const idPedido = respuestaPedido.id || respuestaPedido.id_pedido;
        if (!idPedido) {
          console.error('No se recibió ID del pedido');
          return;
        }

        for (const producto of carrito) {
          const pedidoProducto = {
            fk_id_pedido: idPedido,
            fk_id_producto: producto.id,
            cantidad: producto.cantidad
          };
          this.http.post(`${this.url}/pedidos_productos`, pedidoProducto, { headers })
            .subscribe({
              next: (resp) => console.log('Producto agregado:', resp),
              error: (err) => console.error('Error al agregar producto:', err)
            });
        }
      },
      error: (err) => console.error('Error al crear pedido:', err)
    });
  }

  // Crear pedido
  postPedido(carrito: any[]): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const pedido = {
      fk_id_usuario: Number(this.authService.getId()),
      total: carrito.reduce((acc: number, item: any) => acc + item.precio * item.cantidad, 0),
      estado: 'pendiente',

    };

    // IMPORTANTE: POST, no PUT
    return this.http.post(`${this.url}/pedidos`, pedido, { headers });
  }

  // Métodos auxiliares
  obtenerProductos(): ProductoCarrito[] {
    const productosStr = localStorage.getItem(this.storageKey);
    return productosStr ? JSON.parse(productosStr) : [];
  }

  private guardarCarrito(productos: ProductoCarrito[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(productos));
  }

  agregarProducto(producto: ProductoResponse): void {
    const productos = this.obtenerProductos();
    const productoExistente = productos.find(p => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      productos.push({ ...producto, cantidad: 1 } as ProductoCarrito);
    }
    this.guardarCarrito(productos);
  }

  eliminarProducto(productoId: number): void {
    const productos = this.obtenerProductos().filter(p => p.id !== productoId);
    this.guardarCarrito(productos);
  }

  limpiarCarrito(): void {
    localStorage.removeItem(this.storageKey);
  }

  getPedidoCompleto(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/pedido/${id}`, { headers });
  }
}
