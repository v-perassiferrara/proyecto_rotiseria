import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  templateUrl: './back-button.html',
  styleUrls: ['./back-button.css']
})
export class BackButton {
  constructor(private location: Location) {}

  volver() {
    this.location.back(); // navega a la ruta anterior
  }
}