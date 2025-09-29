import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';

@Component({
  selector: 'app-detalle-producto',
  imports: [
      Navbar,
      Titlebar,
      BackButton
  ],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css'
})
export class DetalleProducto {

}
