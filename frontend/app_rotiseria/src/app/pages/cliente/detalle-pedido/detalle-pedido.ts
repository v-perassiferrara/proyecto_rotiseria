import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';

@Component({
  selector: 'app-detalle-pedido',
  imports: [
      Navbar,
      Titlebar,
      BackButton
  ],
  templateUrl: './detalle-pedido.html',
  styleUrl: './detalle-pedido.css'
})
export class DetallePedido {

}
