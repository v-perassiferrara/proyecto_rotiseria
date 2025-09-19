import { Component } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  imports: [RouterLink, Titlebar, BackButton],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css'
})
export class DetalleProducto {

}
