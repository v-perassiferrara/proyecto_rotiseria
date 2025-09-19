import { Component } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-usuario',
  imports: [RouterLink, Titlebar, BackButton],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.css'
})
export class DetalleUsuario {

}
