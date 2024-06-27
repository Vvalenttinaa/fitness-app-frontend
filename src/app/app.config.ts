import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';


import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Interceptor } from '../app/interceptor/Interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

/*
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync()]
};
*/

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }, provideCharts(withDefaultRegisterables())
  ]
};
