import { Component } from '@angular/core';
import { BackButton } from '../../../components/back-button/back-button';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-datos-personales',
  imports: [Titlebar, BackButton, RouterLink],
  templateUrl: './datos-personales.html',
  styleUrl: './datos-personales.css'
})
export class DatosPersonales {

}
