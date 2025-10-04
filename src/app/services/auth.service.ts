
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://fakestoreapi.com/users';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.restoreUser();
  }

  currentUser: any = null;

  //  Login
  login(body: any): Observable<any> {
    return this.http.post('https://fakestoreapi.com/auth/login', {
      username: 'mor_2314',
      password: '83r5^_'
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.currentUser = { id: 2, first_name: 'Nouran', email: 'nouran@example.com' };
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.userSubject.next(this.currentUser);
      })
    );
  }

  // Get profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/2`).pipe(
      tap((res: any) => {
        this.currentUser = {
          id: res.id,
          first_name: res.name.firstname,
          last_name: res.name.lastname,
          email: res.email,
          phone: res.phone
        };
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.userSubject.next(this.currentUser);
      })
    );
  }

  //  Update profile
  updateProfile(body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/2`, body).pipe(
      tap(() => {
        this.currentUser = { ...this.currentUser, ...body };
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.userSubject.next(this.currentUser);
      })
    );
  }

  //  Restore user after reload
  restoreUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.userSubject.next(this.currentUser);
    }
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.userSubject.next(null);
  }
}
