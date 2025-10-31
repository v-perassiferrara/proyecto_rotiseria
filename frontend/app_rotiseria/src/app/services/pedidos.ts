import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private http = inject(HttpClient);

  url = 'http://localhost:3435';
  getPedidos(page: number = 1, perPage: number = 10): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.url}/pedidos?sortby-fecha=desc&page=${page}&per_page=${perPage}`, {headers});
  }

  getPedidoCompleto(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/pedido/${id}`, { headers });
  }

  cancelarPedido(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    // Usar PUT en lugar de DELETE
    return this.http.put(`${this.url}/pedido/${id}`, 
      { estado: 'cancelado' }, 
      { headers }
    );
  }

  cantidadPedidos(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/pedidos?countEstado=true`, { headers });
  }

  getPedidosByNumeroPedido(numeroPedido: number) {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/pedidos?numeroPedido=${numeroPedido}`, { headers });
  }

  getPedidosByEstado(estado: string) {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/pedidos?estado=${estado}`, { headers });
  }
}