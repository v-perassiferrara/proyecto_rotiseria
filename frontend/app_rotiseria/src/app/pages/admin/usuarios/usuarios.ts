import { Component, ViewChildren, QueryList, AfterViewInit, inject } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { VerUser } from '../../../components/usuarios/ver-user/ver-user';
import { NgClass } from '@angular/common';
import { UsuariosService } from '../../../services/usuarios';

@Component({
  selector: 'app-usuarios',
  imports: [
    Titlebar,
    VerUser,
    NgClass
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {
  
  totalUsuarios = 0;
  selectedTab: 'empleados' | 'clientes' = 'empleados';
  usuariosService = inject(UsuariosService);
}
