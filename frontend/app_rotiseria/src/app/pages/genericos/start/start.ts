import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  imports: [],
  templateUrl: './start.html',
  styleUrl: './start.css'
})
export class Start implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'start-page-active');
    setTimeout(() => {
      document.body.classList.add('fade-out');
      setTimeout(() => {
        this.router.navigate(['/sesion']);
      }, 1500);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'start-page-active');
    // Also remove fade-out class in case the user navigates away before timeout
    this.renderer.removeClass(this.document.body, 'fade-out');
  }
}
