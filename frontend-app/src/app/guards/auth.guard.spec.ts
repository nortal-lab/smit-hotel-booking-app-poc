import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MockBuilder } from 'ng-mocks';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let keycloakService: KeycloakService;
  let router: Router;

  class MockKeycloakAuthGuard extends KeycloakAuthGuard {
    public override authenticated = false;
    public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // Implement logic for the mock here, for simplicity we return the authenticated state
      return this.authenticated;
    }
  }

  beforeEach(async () => {
    await MockBuilder(AuthGuard)
      .provide({
        provide: KeycloakAuthGuard,
        useClass: MockKeycloakAuthGuard,
      })
      .provide({
        provide: Router,
        useValue: { navigate: jest.fn() },
      })
      .provide({
        provide: KeycloakService,
        useValue: { login: jest.fn() },
      });

    guard = TestBed.inject(AuthGuard);
    keycloakService = TestBed.inject(KeycloakService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if authenticated', async () => {
    (guard as any).authenticated = true;
    const result = await guard.isAccessAllowed({} as ActivatedRouteSnapshot, { url: '/test' } as RouterStateSnapshot);
    expect(result).toBe(true);
  });

  it('should not allow access and trigger login if not authenticated', async () => {
    (guard as any).authenticated = false;
    const result = await guard.isAccessAllowed({} as ActivatedRouteSnapshot, { url: '/test' } as RouterStateSnapshot);
    expect(result).toBe(false);
    expect(keycloakService.login).toHaveBeenCalledWith({ redirectUri: window.location.origin + '/test' });
  });
});
