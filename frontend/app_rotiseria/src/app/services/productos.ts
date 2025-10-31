import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private http = inject(HttpClient);

  url = environment.apiUrl;

  getProductos(page: number = 1, perPage: number = 10): Observable<any>{
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/productos?page=${page}&per_page=${perPage}`, { headers });
  }
  
  getProductosTop3(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const urlConParams = `${this.url}/productos?top3=true`;  //funcion del back para traer el top3 


    return this.http.get(urlConParams, { headers });
  }

  getProductosByCategoria(categoriaId: number, page: number = 1, perPage: number = 10): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/productos?categoria=${categoriaId}&page=${page}&per_page=${perPage}`, { headers });
  }

  getProducto(id: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/producto/${id}`, { headers });
  }

  putProducto(id: number, producto: any): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.url}/producto/${id}`, producto, { headers });
  }

  putProductosVisibilityByCategoria(categoriaId: number, visible: boolean): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.url}/productos?categoriaId=${categoriaId}`, { visible }, { headers });
  }

}
