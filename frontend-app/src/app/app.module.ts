import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthService } from './services/auth.service';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';

function initializeKeycloak(keycloak: KeycloakService, authService: AuthService) {
  return () =>
    keycloak
      .init({
        config: {
          url: 'http://localhost:8080/auth',
          realm: 'hotel-app',
          clientId: 'hotel-app',
        },
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false,
        },
        loadUserProfileAtStartUp: false,
      })
      .then(() => authService.init());
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CustomerDashboardModule, KeycloakAngularModule, AdminDashboardModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
