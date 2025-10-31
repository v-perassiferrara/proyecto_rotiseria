import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
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

  
  getUsuarioPorId(id: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.url + "/usuario/" + id, { headers }).pipe(
      tap(datosDelUsuario => {
        // 'tap' permite "espiar" los datos sin modificar el flujo.
        // Este console.log mostrara los datos del usuario cuando el componente se suscriba.
        return(datosDelUsuario);
      })
    );
  }


  putUsuarioPorId(id: string, usuario: any): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(this.url + "/usuario/" + id, usuario, { headers });
  }

  getCountUsuarios(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/usuarios?count`, { headers });
  }


}
