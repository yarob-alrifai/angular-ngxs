import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { UserState } from './state/user/user.state';
import {  NgxsModule } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import {  NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { UserBackendService } from './backend-services/user-backend.service';

export const appConfig: ApplicationConfig = {
  providers: [
    UserBackendService,

    importProvidersFrom(NgxsModule.forRoot([UserState]),
  
   
    NgxsReduxDevtoolsPluginModule.forRoot(),
  
    // ! if you want ot disable it in the production mode 
    // NgxsReduxDevtoolsPluginModule.forRoot(ngxsReduxDevtoolsOptions),
    // ! if you want to log the state in the console 
    // NgxsLoggerPluginModule.forRoot(),

  ),

    provideHttpClient(),

    // UserBackendService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    // provideStore([UserState])
  ],
};
