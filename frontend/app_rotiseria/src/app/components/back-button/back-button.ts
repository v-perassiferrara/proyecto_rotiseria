import { Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  templateUrl: './back-button.html',
  styleUrls: ['./back-button.css']
})
export class BackButton {

  router = inject(Router);
  location = inject(Location);


  toHome = input<boolean>(false);

  volver() {
    if (this.toHome()) {
      this.router.navigate(['/home']); // navega a la página de inicio
    }else{
      this.location.back(); // navega a la ruta anterior
    }
  }
}
