import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { BackButton } from '../../../components/back-button/back-button';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-datos-personales',
  imports: [Navbar, Titlebar, BackButton, RouterLink],
  templateUrl: './datos-personales.html',
  styleUrl: './datos-personales.css'
})
export class DatosPersonales {

}
