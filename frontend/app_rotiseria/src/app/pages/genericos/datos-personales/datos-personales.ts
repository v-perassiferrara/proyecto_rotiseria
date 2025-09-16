import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { BackButton } from '../../../components/back-button/back-button';
import { Titlebar } from '../../../components/titlebar/titlebar';

@Component({
  selector: 'app-datos-personales',
  imports: [Navbar, Titlebar, BackButton],
  templateUrl: './datos-personales.html',
  styleUrl: './datos-personales.css'
})
export class DatosPersonales {

}
