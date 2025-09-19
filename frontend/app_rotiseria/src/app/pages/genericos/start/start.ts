import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  imports: [],
  templateUrl: './start.html',
  styleUrl: './start.css'
})
export class Start implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      document.body.classList.add('fade-out');
      setTimeout(() => {
        this.router.navigate(['/sesion']);
      }, 1500);
    }, 3000);
  }
}
