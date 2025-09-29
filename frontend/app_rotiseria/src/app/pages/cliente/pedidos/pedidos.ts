import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  imports: [
    Navbar,
    Titlebar,
    RouterLink
  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos {

}
