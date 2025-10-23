import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  postPedidoProducto(carrito: any[]): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.postPedido(carrito).pipe(
      switchMap((respuestaPedido: any) => {
        const idPedido = respuestaPedido.id || respuestaPedido.id_pedido;
        console.log('ID del pedido creado:', idPedido);
        console.log('Carrito:', carrito);

        const peticiones = carrito.map(producto => {
          const pedidoProducto = {
            fk_id_pedido: idPedido,
            fk_id_producto: producto.id,
            cantidad: producto.cantidad
          };
          console.log('Enviando producto:', pedidoProducto);
          return this.http.post(`${this.url}/pedidos-productos`, pedidoProducto, { headers });
        });

        return forkJoin(peticiones);
      })
    );
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
