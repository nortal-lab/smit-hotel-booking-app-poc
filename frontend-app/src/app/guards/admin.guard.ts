import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { UserRoles } from '../models/user-roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(
      map((user) => {
        if (user.role !== UserRoles.EMPLOYEE) {
          this.router.navigate(['']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
