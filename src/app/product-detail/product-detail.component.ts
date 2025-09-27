import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../interfaces/interface';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  selectedImage?: string;
  imageModalOpen = false;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private loc: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.fetch(+id);
  }

  fetch(id: number) {
    this.loading = true;
    this.ps.getProductById(id).subscribe({
      next: p => {
        this.product = p;
        this.selectedImage = (p.images && p.images.length) ? p.images[0] : p.thumbnail;
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load product.';
        this.loading = false;
      }
    });
  }

  interpretInStock(): boolean {
    if (!this.product) return false;
    if (this.product.availabilityStatus) {
      const s = this.product.availabilityStatus.toLowerCase();
      return !(s.includes('out') || s.includes('sold out'));
    }
    return (this.product.stock ?? 0) > 0;
  }

  openImage(img?: string) {
    this.selectedImage = img;
    this.imageModalOpen = true;
  }
  closeModal() {
    this.imageModalOpen = false;
  }
  goBack() {
    this.loc.back();
  }
}
