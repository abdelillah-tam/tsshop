import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { addedToCartReducer, addProductReducer, fileReducer, productReducer, productsFromCart, productsReducer, topSellerProductsReducer, userReducer } from './store/reducers';
import { FileEffects, ProductEffects, UserEffects } from './store/effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withHashLocation()),
  provideAnimationsAsync(),
  provideStore(),
  provideState({ name: 'user', reducer: userReducer }),
  provideState({ name: 'file', reducer: fileReducer }),
  provideState({ name: 'product', reducer: productReducer }),
  provideState({name: 'addProduct', reducer: addProductReducer}),
  provideState({ name: 'products', reducer: productsReducer }),
  provideState({name: 'top', reducer: topSellerProductsReducer}),
  provideState({name: 'cart', reducer: addedToCartReducer}),
  provideState({name: 'cartProducts', reducer: productsFromCart}),
  provideEffects(UserEffects, FileEffects, ProductEffects),
  provideHttpClient(), provideAnimationsAsync()]
};
