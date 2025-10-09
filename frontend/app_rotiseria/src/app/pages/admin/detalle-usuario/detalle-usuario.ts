import { Component, inject } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Abm } from "../../../components/usuarios/abm/abm";
import { Usuarios } from '../../../services/usuarios';

@Component({
  selector: 'app-detalle-usuario',
  imports: [Titlebar, BackButton, Abm],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.css'
})
export class DetalleUsuario {
  authService = inject(Auth);
  usuariosSvc = inject(Usuarios);
  usuario: Usuarios | null = null;

  route = inject(ActivatedRoute)

  ngOnInit() {
    const id = this.route.snapshot.params['id'] || '';
    this.usuariosSvc.getUsuarioPorId(id).subscribe((usuario) => {
      this.usuario = usuario;
    });

    
  }
}
