import { Component, inject, OnInit } from '@angular/core';
import { AbmPromocion } from '../../../components/promociones/abm/abm';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { RouterLink } from '@angular/router';
import { PromocionesService } from '../../../services/promociones';


@Component({
  selector: 'app-detalle-promocion',
  imports: [Titlebar, BackButton, AbmPromocion, RouterLink],
  templateUrl: './detalle-promocion.html',
  styleUrl: './detalle-promocion.css'
})
export class DetallePromocion{
 

}
