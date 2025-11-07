import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  
  private http = inject(HttpClient);

  url = 'http://localhost:3435';
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
      mensaje: `El estado de su pedido con ID ${idPedido} ha sido actualizado a '${estado}'.`
    };

    return this.http.post(`${this.url}/notificaciones`, notificacion, { headers });
  }
}