import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Usuarios {
  
  private http = inject(HttpClient);

  url = environment.apiUrl;

  getUsuarios(rol?: string): Observable<any> {
  const token = localStorage.getItem('token') || '';
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  let params: any = {};
  if (rol) {
    params.rol = rol;
  }

  console.log("Params: ", params);

  return this.http.get(this.url + "/usuarios", { headers, params });
}

}
