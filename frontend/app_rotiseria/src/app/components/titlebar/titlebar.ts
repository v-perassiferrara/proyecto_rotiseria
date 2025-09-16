import { Component , ChangeDetectionStrategy, input} from '@angular/core';

@Component({
  selector: 'app-titlebar',
  standalone: true,
  templateUrl: './titlebar.html',
  styleUrl: './titlebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Titlebar {
  // Input para el título de la barra.
  // Para usarlo, pasarle argumento [title], por ej: <app-titlebar [title]="'Datos Personales'" />
  title = input.required<string>();
}
