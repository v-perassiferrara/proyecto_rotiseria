import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);

  url = 'http://localhost:3435';
  
  /**
   * Realiza el login y guarda el token en localStorage si es exitoso.
   */
  login(dataLogin: LoginRequest): Observable<any> {
    return this.http.post(this.url + "/auth/login", dataLogin)
  }

  
  /**
   * Decodifica el token guardado y devuelve el rol del usuario.
   * Devuelve null si no hay token o si es inválido.
   */
  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    
    try {
      const decodedToken = jwtDecode<TokenPayload>(token);


      console.log("hola", decodedToken.rol)



      return decodedToken.rol;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }
}