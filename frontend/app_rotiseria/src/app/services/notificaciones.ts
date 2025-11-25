import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  
  private http = inject(HttpClient);

  url = environment.apiUrl;
  getNotificaciones(page: number = 1, perPage: number = 10): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(`${this.url}/notificaciones?sortby-fecha=desc&page=${page}&per_page=${perPage}`, {headers});
  }

  postNotificacion(idUsuario: number, idPedido: number, estado: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const notificacion = {
      fk_id_usuario: idUsuario,
      mensaje: `Pedido #${idPedido}: ${estado.charAt(0).toUpperCase() + estado.slice(1)}`,
    };

    return this.http.post(`${this.url}/notificaciones`, notificacion, { headers });
  }
}