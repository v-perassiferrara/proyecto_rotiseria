import { Component, HostListener, inject, input, OnInit } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { PromocionesService } from '../../../services/promociones';


@Component({
  selector: 'app-promociones',
  imports: [
    Titlebar,

  ],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css'
})
export class Promociones implements OnInit{

  arrayPromociones: any[] = [];
  promocionesService = inject(PromocionesService);


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

}
