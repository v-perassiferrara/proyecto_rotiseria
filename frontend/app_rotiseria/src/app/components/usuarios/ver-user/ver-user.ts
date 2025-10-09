import { Component, inject, input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuarios } from '../../../services/usuarios';

@Component({
  selector: 'app-ver-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ver-user.html',
  styleUrl: './ver-user.css',
})
export class VerUser implements OnInit {

  nombre!: string;

  rol = input.required<string>();

  arrayUsuarios: any[] = [];
  arrayFiltered: any[] = [];
  
  router = inject(Router)
  usuarioSvc = inject(Usuarios)

  
  ngOnInit(){

    this.usuarioSvc.getUsuarios(this.rol().toLowerCase()).subscribe({
      next: (res:any) => {
        this.arrayUsuarios = res.usuarios;

        this.arrayUsuarios = this.arrayUsuarios.sort()

        this.arrayFiltered = [...this.arrayUsuarios]
      },
      error: (err) => {
        console.log("Error al traer usuarios: ", err);
      }
    })
  }

  editarUsuario(usuario:any){
    this.router.navigateByUrl(`/admin/usuario/${usuario.id}`);
  }

  buscar(){
    if (!this.nombre) {
      this.arrayFiltered = [...this.arrayUsuarios];
      return;
    }
    let nombreNuevo = this.nombre.toLowerCase();
    this.arrayFiltered = this.arrayUsuarios.filter((u: any) => 
      u.nombre?.toLowerCase().includes(nombreNuevo) || 
      u.apellido?.toLowerCase().includes(nombreNuevo)
    );
  }

  get cantidadUsuarios(): number {
    return this.arrayUsuarios.length;
  }
}