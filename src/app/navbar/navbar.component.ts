import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="p-3 bg-dark text-primary flex justify-between">
      <span>🛍️ E-Commerce</span>
      <div *ngIf="user">
        Welcome, {{ user.first_name }} |
        <a (click)="goToProfile()" class="underline cursor-pointer">My Profile</a>
      </div>
    </nav>
  `
})
export class NavbarComponent implements OnInit {
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // listen to user changes in real time
    this.auth.user$.subscribe(user => this.user = user);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
