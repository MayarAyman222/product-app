import {  OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Product } from '../interfaces/interface';
import { ProductService } from '../services/product.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule , RouterLink],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  categories: string[] = ['all'];
  searchText = '';
  selectedCategory = 'all';
  availabilityFilter: 'all' | 'in' | 'out' = 'all';
  minRating = 0;
  loading = false;
  errorMsg = '';

  constructor(private ps: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.ps.getAllProducts().subscribe({
      next: prods => {
        this.products = prods;
        this.applyFilters();
        this.loading = false;
        console.log(prods);
      },
      error: () => {
        this.errorMsg = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.ps.getCategories().subscribe({
      next: cats => {
        this.categories = ['all', ...cats];
      },
      error: () => { this.categories = ['all']; }
    });
  }

  applyFilters() {
    const q = this.searchText.trim().toLowerCase();
    this.filtered = this.products.filter(p => {
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesCategory = this.selectedCategory === 'all' || p.category === this.selectedCategory;
      const matchesRating = (p.rating ?? 0) >= this.minRating;

      let inStock = false;
      if (p.availabilityStatus) {
        const s = p.availabilityStatus.toLowerCase();
        inStock = !(s.includes('out') || s.includes('sold out'));
      } else {
        inStock = (p.stock ?? 0) > 0;
      }

      const matchesAvailability = this.availabilityFilter === 'all' ||
        (this.availabilityFilter === 'in' && inStock) ||
        (this.availabilityFilter === 'out' && !inStock);

      return matchesSearch && matchesCategory && matchesRating && matchesAvailability;
    });
  }

  onSearchChange() { this.applyFilters(); }
  clearSearch() { this.searchText = ''; this.applyFilters(); }

  openProduct(p: Product) {
    this.router.navigate(['/products', p.id]);
  }
}
