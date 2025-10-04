import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-5 max-w-md mx-auto">
      <h2 class="text-xl mb-4">Edit Profile</h2>
      <form [formGroup]="form" (ngSubmit)="save()">
        <input formControlName="first_name" placeholder="First name" class="border p-2 w-full mb-2" />
        <input formControlName="last_name" placeholder="Last name" class="border p-2 w-full mb-2" />
        <input formControlName="phone" placeholder="Phone" class="border p-2 w-full mb-2" />
        <input formControlName="email" placeholder="Email" class="border p-2 w-full mb-4" />
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      first_name: [''],
      last_name: [''],
      phone: [''],
      email: ['']
    });

    if (this.auth.currentUser) {
      this.form.patchValue(this.auth.currentUser);
    } else {
      this.auth.getProfile().subscribe(res => {
        this.form.patchValue(this.auth.currentUser);
      });
    }
  }

  save() {
    this.auth.updateProfile(this.form.value).subscribe({
      next: () => {
        alert('Profile updated!');
        this.router.navigate(['/products']);
      }
    });
  }
}
