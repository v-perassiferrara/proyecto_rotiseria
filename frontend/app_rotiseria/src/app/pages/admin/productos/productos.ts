import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Titlebar } from '../../../components/titlebar/titlebar';

@Component({
  selector: 'app-productos',
  imports: [
    RouterLink,
    Titlebar
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

}
