import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';

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

}
