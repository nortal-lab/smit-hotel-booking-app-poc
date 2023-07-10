import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthService } from './services/auth.service';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { UiModule } from '@egov/cvi-ng';
import { SearchHomepageModule } from './search-homepage/search-homepage.module';
import { BookingProcessModule } from './booking-process/booking-process.module';
import { CustomerBookingsModule } from './customer-bookings/customer-bookings.module';

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
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerDashboardModule,
    KeycloakAngularModule,
    AdminDashboardModule,
    BookingProcessModule,
    UiModule,
    SearchHomepageModule,
    CustomerBookingsModule,
  ],
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
