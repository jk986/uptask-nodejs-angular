
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule,NgModel } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      FormsModule,
      RouterModule,
    ),
    
  ]
};


//Aqui se pueden hacer importaciones como en app module con: importProvidersFrom()