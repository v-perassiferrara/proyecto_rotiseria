import { Component , ChangeDetectionStrategy, input} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-titlebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './titlebar.html',
  styleUrl: './titlebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Titlebar {
  // Input para el título de la barra.
  // Para usarlo, pasarle argumento [title], por ej: <app-titlebar [title]="'Datos Personales'" />
  title = input.required<string>();
  // 5. Definimos el nuevo input 'admin', opcional y por defecto 'false'
  admin = input<boolean>(false);
}
