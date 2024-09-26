import { ApplicationConfig } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './services/logging.interceptor';
import { authHttpInterceptor } from './auth/auth.http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authHttpInterceptor, loggingInterceptor])),
    provideRouter(routes, withDebugTracing()),
    provideAnimationsAsync(),
  ]
};
