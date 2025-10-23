import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private http = inject(HttpClient);

  url = 'http://localhost:3435';
  getPedidos(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.url + "/pedidos", {headers});
  }

  getPedidoCompleto(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/pedido/${id}`, { headers });
  }

  // cancelarPedido(id: number): Observable<any> {
  //   const token = localStorage.getItem('token') || '';
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`,
  //     'Body': JSON.stringify({ estado: 'cancelado' })
  //   });
  //   return this.http.delete(`${this.url}/pedido/${id}`, { headers });
  // }

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
}
