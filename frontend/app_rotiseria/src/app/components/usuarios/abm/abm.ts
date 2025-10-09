import { Component, inject, Input } from '@angular/core';
import { Auth } from '../../../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-abm',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './abm.html',
  styleUrl: './abm.css'
})
export class Abm {
  authService = inject(Auth);

  @Input() userId!: string;
}
