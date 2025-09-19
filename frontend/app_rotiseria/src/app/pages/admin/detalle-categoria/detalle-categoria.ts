import { Component } from '@angular/core';
import { BackButton } from '../../../components/back-button/back-button';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-categoria',
  imports: [RouterLink, BackButton, Titlebar],
  templateUrl: './detalle-categoria.html',
  styleUrl: './detalle-categoria.css'
})
export class DetalleCategoria {

}
