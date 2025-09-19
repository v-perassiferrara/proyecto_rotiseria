import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Titlebar } from '../../../components/titlebar/titlebar';

@Component({
  selector: 'app-pedidos',
  imports: [
    RouterLink,
    Titlebar

  ],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos {

}
