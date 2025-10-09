import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';

@Component({
  selector: 'app-carrito',
  imports: [
    Navbar,
    Titlebar
  ],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {

}