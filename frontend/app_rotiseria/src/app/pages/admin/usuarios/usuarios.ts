import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { VerUser } from '../../../components/usuarios/ver-user/ver-user';

@Component({
  selector: 'app-usuarios',
  imports: [
    Titlebar,
    VerUser
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements AfterViewInit {
  @ViewChildren(VerUser) verUserComponents!: QueryList<VerUser>;
  
  totalUsuarios = 0;

  ngAfterViewInit() {
    // Esperar a que los componentes hijos carguen sus datos
    setTimeout(() => {
      this.calcularTotalUsuarios();
    }, 1000);
  }

  calcularTotalUsuarios() {
    this.totalUsuarios = this.verUserComponents.reduce((total, component) => {
      return total + component.cantidadUsuarios;
    }, 0);
  }
}
