import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';
import { BackButton } from '../../../components/back-button/back-button';


@Component({
  selector: 'app-productos',
  imports: [
    Navbar,
    Titlebar,
    RouterLink,
    BackButton
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

}