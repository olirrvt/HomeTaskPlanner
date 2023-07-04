import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookie: CookieService
  ) {}

  canActivate(): boolean {
    const token = this.cookie.get('token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false; 
    }
  }
}
