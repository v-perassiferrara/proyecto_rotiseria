import { Component, inject } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Abm } from "../../../components/usuarios/abm/abm";

@Component({
  selector: 'app-detalle-usuario',
  imports: [Titlebar, BackButton, Abm],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.css'
})
export class DetalleUsuario {
  authService = inject(Auth);

  userId!: string;

  route = inject(ActivatedRoute)

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'] || '';

    console.log("user id: ", this.userId);
  }
}
