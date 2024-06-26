import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideNgxWebstorage, withNgxWebstorageConfig } from 'ngx-webstorage';

import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideNgxWebstorage(), CookieService]
};
