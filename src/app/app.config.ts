import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { fileReducer, productReducer, productsReducer, userReducer } from './store/reducers';
import { FileEffects, ProductEffects, UserEffects } from './store/effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideAnimationsAsync(),
  provideStore(),
  provideState({ name: 'user', reducer: userReducer }),
  provideState({ name: 'file', reducer: fileReducer }),
  provideState({ name: 'product', reducer: productReducer }),
  provideState({ name: 'products', reducer: productsReducer }),
  provideEffects(UserEffects, FileEffects, ProductEffects),
  provideHttpClient(), provideAnimationsAsync()]
};
