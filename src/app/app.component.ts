import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
   imports: [RouterOutlet , RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/products">My Shop</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>

    <main class="py-4">
      <router-outlet></router-outlet>
    </main>

    <footer class="text-center py-3 text-muted">
      © {{ currentYear }} My Shop
    </footer>
  `
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}

