import { Component, inject, Input, OnInit } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { PromocionesService } from '../../../services/promociones';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promociones',
  imports: [
    Titlebar
  ],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css'
})
export class Promociones implements OnInit {

  arrayPromociones: any[] = [];
  promocionesService = inject(PromocionesService);
  router = inject(Router)

  formBuilder = inject(FormBuilder);

  @Input() promocion: any = null;
  usuarioForm!: FormGroup;

  ngOnInit(): void {
    this.promocionesService.getPromociones().subscribe({
      next: (data: any) => {
        this.arrayPromociones = data.promociones || [];
      },
      error: (err) => {
        console.error('Error al cargar promociones:', err);
      }
    });
  }

  crearPromocion(){
    console.log("Editando promocion: ");
    this.router.navigateByUrl(`/admin/detalle-promocion`);
  }

  eliminarPromocion(promocion: any){
    console.log("Eliminando promocion: ", promocion);
    console.log("id", promocion.id);
    this.promocionesService.deletePromocion(promocion.id).subscribe({
      next: (data: any) => {
        console.log("data", data);
        window.location.reload(); // Para recargar la pagina y ver los cambios
      },
      error: (err) => {
        console.error('Error al eliminar promocion:', err);
      }
    });
  }

}
 
