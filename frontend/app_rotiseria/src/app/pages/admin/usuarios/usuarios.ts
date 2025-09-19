import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Titlebar } from '../../../components/titlebar/titlebar';

@Component({
  selector: 'app-usuarios',
  imports: [
    RouterLink,
    Titlebar
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {

}
