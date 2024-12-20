import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth/auth.service';
import {
  ADD_PRODUCT,
  ADD_TO_CART,
  addedToCartAction,
  GET_FROM_CART,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_USER,
  gottenProductAction,
  gottenProductsAndCountAction,
  gottenProductsFromCartAction,
  gottenTopSellersAction,
  gottenUserAction,
  loggedInAction,
  LOGIN_ACTION,
  passImageUrlAction,
  productAddedAction,
  REMOVE_FROM_CART,
  signedupAction,
  SIGNUP_ACTION,
  TOP_SELLERS,
  UPLOAD_PRODUCT_IMAGE,
  USER_TOKEN_VALIDATION,
  validationResultAction,
} from './actions';
import { exhaustMap, forkJoin, from, lastValueFrom, map } from 'rxjs';
import { FileService } from '../services/file/file.service';
import { ProductService } from '../services/product/product.service';
import { Product } from '../model/product';
import { User } from '../model/user';
import { CartProduct } from '../model/cart-product';

@Injectable()
export class UserEffects {
  login$;
  validating$;
  signup$;
  getUser$;

  constructor(private actions: Actions, private authService: AuthService) {
    this.login$ = createEffect(() =>
      this.actions.pipe(
        ofType(LOGIN_ACTION),
        exhaustMap((value: { email: string; password: string }) => {
          return this.authService.login(value.email, value.password).pipe(
            // @ts-ignore
            map((data) =>
              loggedInAction({
                email: data.email,
                objectId: data.objectId,
                userToken: data['user-token'],
                userType: data.type,
              })
            )
          );
        })
      )
    );

    this.validating$ = createEffect(() =>
      this.actions.pipe(
        ofType(USER_TOKEN_VALIDATION),
        exhaustMap((value: { token: string }) => {
          return this.authService
            .userTokenValidation(value.token)
            .pipe(map((data) => validationResultAction({ valid: data })));
        })
      )
    );

    this.signup$ = createEffect(() =>
      this.actions.pipe(
        ofType(SIGNUP_ACTION),
        exhaustMap((value: { user: User; password: string }) => {
          return this.authService
            .signup(value.user, value.password)
            .pipe(map((data) => signedupAction({ user: data })));
        })
      )
    );

    this.getUser$ = createEffect(() =>
      this.actions.pipe(
        ofType(GET_USER),
        exhaustMap(() => {
          return this.authService
            .getUser()
            .pipe(map((data) => gottenUserAction({ user: data })));
        })
      )
    );
  }
}

@Injectable()
export class FileEffects {
  upload$;

  constructor(private actions: Actions, private fileService: FileService) {
    this.upload$ = createEffect(() =>
      this.actions.pipe(
        ofType(UPLOAD_PRODUCT_IMAGE),
        exhaustMap((value: { file: File[]; product: Product }) => {
          return from(this.fileService.uploadFiles(value.file)).pipe(
            map((urls) => {
              return passImageUrlAction({ urls: urls, product: value.product });
            })
          );
        })
      )
    );
  }
}

@Injectable()
export class ProductEffects {
  add$;
  allProducts$;
  product$;
  topSellers$;
  addToCart$;
  getProductsFromCart$;
  removeFromCart$;

  constructor(
    private actions: Actions,
    private productService: ProductService
  ) {
    this.add$ = createEffect(() =>
      this.actions.pipe(
        ofType(ADD_PRODUCT),
        exhaustMap((value: { product: Product }) => {
          return this.productService.addProduct(value.product).pipe(
            map((product) => {
              return productAddedAction({ product: product });
            })
          );
        })
      )
    );

    this.allProducts$ = createEffect(() =>
      this.actions.pipe(
        ofType(GET_PRODUCTS),
        exhaustMap((value: { category: string; offset: number }) => {
          return forkJoin({
            products: this.productService.getProductsByCategory(
              value.category,
              value.offset
            ),
            count: this.productService.getCountByCategory(value.category),
          }).pipe(
            map((data) => {
              return gottenProductsAndCountAction({
                products: data.products,
                count: data.count[0].count,
              });
            })
          );
        })
      )
    );

    this.product$ = createEffect(() =>
      this.actions.pipe(
        ofType(GET_PRODUCT),
        exhaustMap((value: { objectId: string }) => {
          return this.productService.getProduct(value.objectId).pipe(
            map((data) => {
              return gottenProductAction({ product: data });
            })
          );
        })
      )
    );

    this.topSellers$ = createEffect(() =>
      this.actions.pipe(
        ofType(TOP_SELLERS),
        exhaustMap(() => {
          return this.productService.getTopSeller().pipe(
            map((data) => {
              return gottenTopSellersAction({ products: data });
            })
          );
        })
      )
    );

    this.addToCart$ = createEffect(() =>
      this.actions.pipe(
        ofType(ADD_TO_CART),
        exhaustMap((value: { product: CartProduct }) => {
          return this.productService.addToCart(value.product).pipe(
            map((data) => {
              return addedToCartAction({ objectId: data.objectId });
            })
          );
        })
      )
    );

    this.getProductsFromCart$ = createEffect(() =>
      this.actions.pipe(
        ofType(GET_FROM_CART),
        exhaustMap(async () => {
          let cartProducts = await lastValueFrom(
            this.productService.getProductsFromCart()
          );

          let products: Product[] = [];
          for (let i = 0; i < cartProducts.length; i++) {
            let product = await lastValueFrom(
              this.productService.getProduct(cartProducts[i].objectId)
            );
            product.productQuantity = cartProducts[i].productQuantity;
            products = [...products, product];
          }
          return gottenProductsFromCartAction({ products: products });
        })
      )
    );

    this.removeFromCart$ = createEffect(
      () =>
        this.actions.pipe(
          ofType(REMOVE_FROM_CART),
          exhaustMap(() => {
            return this.productService.removeFromCart();
          })
        ),
      {
        dispatch: false,
      }
    );
  }
}
