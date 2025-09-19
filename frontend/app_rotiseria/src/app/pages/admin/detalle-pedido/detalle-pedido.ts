import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';

@Component({
  selector: 'app-detalle-pedido',
  imports: [RouterLink, Titlebar, BackButton],
  templateUrl: './detalle-pedido.html',
  styleUrl: './detalle-pedido.css'
})
export class DetallePedido {

}
