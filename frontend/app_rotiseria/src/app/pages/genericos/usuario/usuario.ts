import { Component, inject } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-usuario',
  imports: [
    Navbar,
    Titlebar,
    RouterLink
  ],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario {

  authService = inject(Auth);
  router = inject(Router);


  irLogout(){
    localStorage.removeItem("token");
    this.router.navigate(['/sesion']);
  }
}
