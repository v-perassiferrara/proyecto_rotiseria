import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  
  private http = inject(HttpClient);
  
  url = environment.apiUrl;
  
  getPromociones(page: number = 1, perPage: number = 10): Observable<any>{
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/promociones/?page=${page}&per_page=${perPage}`, { headers });
  }
  
  postPromocion(data: any): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url}/promociones/`, data, { headers });
  }
  
  deletePromocion(id: any) {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.url}/promocion/${id}`, { headers });
  }
}

