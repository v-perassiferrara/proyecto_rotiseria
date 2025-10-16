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

  getProductos(): Observable<any>{
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url + '/productos', { headers });
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

  getProductosByCategoria(categoriaId: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(categoriaId);
    return this.http.get(`${this.url}/productos?categoria=${categoriaId}`, { headers });
  }

}
