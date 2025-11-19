import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { PromocionesService } from '../../../services/promociones';
import { NotificacionesService } from '../../../services/notificaciones';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-notificaciones',
  imports: [
    Navbar,
    Titlebar,
    CommonModule,
    BackButton],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css'
})
export class Notificaciones implements OnInit{
  
  arrayPromociones?: any[] = [];
  promocionesService = inject(PromocionesService);
  arrayNotificaciones?: any[] = [];
  notificacionesService = inject(NotificacionesService);

  // Solo puede ser 'promociones' o 'notificaciones'
  selectedTab: 'promociones' | 'notificaciones' = 'notificaciones';


  ngOnInit(): void {
    this.promocionesService.getPromociones().subscribe({
      next: (data: any) => {
        this.arrayPromociones = data.promociones || [];
      },
      error: (err) => {
        console.error('Error al cargar promociones:', err);
      }
    });
    this.notificacionesService.getNotificaciones().subscribe({
      next: (data: any) => {
        this.arrayNotificaciones = data.notificaciones || [];
      },
      error: (err) => {
        console.error('Error al cargar notificaciones:', err);
      }
    });

  }
}
