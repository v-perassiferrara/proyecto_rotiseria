import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);

  url = environment.apiUrl;
  
  /**
   * Realiza el login
   */
  login(dataLogin: LoginRequest): Observable<any> {
    return this.http.post(this.url + "/auth/login", dataLogin)
  }

  /**
   * Realiza el registro
   */
  register(dataRegister: RegisterRequest): Observable<any> {
    return this.http.post(this.url + "/auth/register", dataRegister)
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

      return decodedToken.rol;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  getEmail(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    
    try {
      const decodedToken = jwtDecode<TokenPayload>(token);

      return decodedToken.email;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  getId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    
    try {
      const decodedToken = jwtDecode<TokenPayload>(token);

      return decodedToken.id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }
}