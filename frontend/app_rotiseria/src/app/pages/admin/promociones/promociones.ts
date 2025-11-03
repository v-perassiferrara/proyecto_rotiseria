import { Component, HostListener, inject, Input, input, OnInit } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { PromocionesService } from '../../../services/promociones';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-promociones',
  imports: [
    Titlebar,
    RouterLink
  ],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css'
})
export class Promociones implements OnInit{

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
    console.log(this.arrayPromociones )
  }

  crearPromocion(){
    console.log("Editando categoria: ");
    this.router.navigateByUrl(`/admin/detalle-promocion`);
  }

}
