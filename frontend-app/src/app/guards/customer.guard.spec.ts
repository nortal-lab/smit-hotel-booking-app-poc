import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MockBuilder } from 'ng-mocks';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { UserRoles } from '../models/user-roles.enum';
import { CustomerGuard } from './customer.guard';

describe('CustomerGuard', () => {
  let guard: CustomerGuard;
  let authService: any;
  let router: Router;

  beforeEach(async () => {
    await MockBuilder(CustomerGuard)
      .provide({
        provide: AuthService,
        useValue: {
          user$: of({ role: UserRoles.CUSTOMER }),
        },
      })
      .provide({
        provide: Router,
        useValue: { navigate: jest.fn() },
      });

    guard = TestBed.inject(CustomerGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is an employee', (done) => {
    authService.user$ = of({ role: UserRoles.CUSTOMER });
    guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe((isAllowed) => {
      expect(isAllowed).toBe(true);
      expect(router.navigate).not.toHaveBeenCalledWith(['']);
      done();
    });
  });

  it('should not allow access and redirect if user is not an employee', (done) => {
    authService.user$ = of({ role: UserRoles.EMPLOYEE });
    guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe((isAllowed) => {
      expect(isAllowed).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['']);
      done();
    });
  });
});
