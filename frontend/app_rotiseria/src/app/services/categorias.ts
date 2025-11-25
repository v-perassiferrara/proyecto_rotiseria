import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private http = inject(HttpClient);

  url = environment.apiUrl;

  getCategorias(): Observable<any>{
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url + '/categorias', { headers });
  }

  getCategoria(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/categoria/${id}`, { headers });
  }

  putCategoria(id: number, categoria: any): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.url}/categoria/${id}`, categoria, { headers });
  }

  deleteCategoria(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.url}/categoria/${id}`, { headers });
  }

  postCategorias(categoria: any){
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.url}/categorias`, categoria, { headers });
  }

}
