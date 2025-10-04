import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
  
    <app-navbar *ngIf="!isLoginPage()" ></app-navbar>

   
    <router-outlet></router-outlet>

  
    <footer class="text-center py-3 text-muted">
      © {{ currentYear }} My Shop
    </footer>
  `
})
export class AppComponent {
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  isLoginPage() {
    return this.router.url.includes('login');
  }
}
