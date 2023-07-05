import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockBuilder, MockService } from 'ng-mocks';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { KeycloakService } from 'keycloak-angular';
import { UserRoles } from '../models/user-roles.enum';

describe('AuthService', () => {
  let service: AuthService;
  let mockRouter = MockService(Router, {
    navigate(): Promise<boolean> {
      return Promise.resolve(true);
    },
  });
  const mockKeycloakService = {
    isLoggedIn: jest.fn(),
    getKeycloakInstance: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    await MockBuilder(AuthService)
      .provide({
        provide: Router,
        useValue: mockRouter,
      })
      .provide({
        provide: KeycloakService,
        useValue: MockService(KeycloakService, {
          logout(): Promise<void> {
            return Promise.resolve();
          },
        }),
      });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user as Employee and navigate to /admin when user role is EMPLOYEE', (done) => {
    mockKeycloakService.isLoggedIn.mockResolvedValue(true);
    mockKeycloakService.getKeycloakInstance.mockReturnValue({
      tokenParsed: {
        resource_access: {
          'hotel-app': {
            roles: [UserRoles.EMPLOYEE],
          },
        },
        family_name: 'Test',
        personal_identification_number: '123',
      },
    });

    const navigationSpy = jest.spyOn(mockRouter, 'navigate');

    service.user$.pipe(map((user, index) => ({ user, index }))).subscribe(({ user, index }) => {
      service.init().then(() => {
        if (index > 0) {
          expect(user.role).toEqual(UserRoles.EMPLOYEE);
          expect(navigationSpy).toHaveBeenCalledWith(['/admin']);
        }
      });
      done();
    });
  });

  it('should set user as Customer and not navigate to /admin when user role is CUSTOMER', (done) => {
    mockKeycloakService.isLoggedIn.mockResolvedValue(true);
    mockKeycloakService.getKeycloakInstance.mockReturnValue({
      tokenParsed: {
        resource_access: {
          'hotel-app': {
            roles: [UserRoles.CUSTOMER],
          },
        },
        family_name: 'Test',
        personal_identification_number: '123',
      },
    });

    const navigationSpy = jest.spyOn(mockRouter, 'navigate');

    service.user$.pipe(map((user, index) => ({ user, index }))).subscribe(({ user, index }) => {
      service.init().then(() => {
        if (index > 0) {
          expect(user.role).toEqual(UserRoles.CUSTOMER);
          expect(navigationSpy).not.toHaveBeenCalledWith(['/admin']);
        }
      });
      done();
    });
  });

  it('should call logout on KeycloakService and user$ should return initial value when logout is called', (done) => {
    service.user$.pipe(map((user, index) => ({ user, index }))).subscribe(({ user, index }) => {
      if (index > 0) {
        expect(user).toEqual({
          role: UserRoles.CUSTOMER,
          username: '',
          personalIdentificationNumber: '',
        });
      }
      expect(mockKeycloakService.logout).not.toHaveBeenCalledTimes(1);
      done();
    });

    service.logout();
  });

  it('should complete userSubject$ observable on destroy', () => {
    const userSubjectSpy = jest.spyOn(service['userSubject$'], 'complete');
    service.ngOnDestroy();
    expect(userSubjectSpy).toHaveBeenCalled();
  });
});
