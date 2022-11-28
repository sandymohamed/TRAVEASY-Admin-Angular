import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class ModeratorGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isLoggedIn = this.storageService.isLoggedIn()
    let user: any = window.sessionStorage.getItem(USER_KEY);
    let userRoles = JSON.parse(user)?.roles

    if (userRoles?.includes('ROLE_MODERATOR') || userRoles?.includes('ROLE_ADMIN')) {
      return true;
    } else {
      this.router.navigate(['/forbiden'], { skipLocationChange: true });
      return false;
    }
  }
}
