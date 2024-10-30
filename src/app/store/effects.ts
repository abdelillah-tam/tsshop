import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth/auth.service";
import { ADD_PRODUCT, GET_PRODUCT, GET_PRODUCTS, gottenProductAction, gottenProductsAndCountAction, gottenTopSellersAction, loggedInAction, LOGIN_ACTION, passImageUrlAction, productAddedAction, signedupAction, SIGNUP_ACTION, TOP_SELLERS, UPLOAD_PRODUCT_IMAGE, USER_TOKEN_VALIDATION, validationResultAction } from "./actions";
import { catchError, exhaustMap, forkJoin, from, map } from "rxjs";
import { FileService } from "../services/file/file.service";
import { ProductService } from "../services/product/product.service";
import { Product } from "../model/product";
import { User } from "../model/user";

@Injectable()
export class UserEffects {

    login$;
    validating$;
    signup$;

    constructor(private actions: Actions, private authService: AuthService) {
        this.login$ = createEffect(() => this.actions.pipe(
            ofType(LOGIN_ACTION),
            exhaustMap((value: { email: string; password: string }) => {
                return this.authService.login(value.email, value.password)
                    .pipe(
                        // @ts-ignore
                        map(data => loggedInAction({
                            email: data.email, objectId: data.objectId, userToken: data["user-token"], userType: data.type
                        }))
                    )
            })
        ));

        this.validating$ = createEffect(() => this.actions.pipe(
            ofType(USER_TOKEN_VALIDATION),
            exhaustMap(() => {
                return this.authService.userTokenValidation()
                    .pipe(
                        map(data => validationResultAction({ valid: data }))
                    )
            })
        ));

        this.signup$ = createEffect(() => this.actions.pipe(
            ofType(SIGNUP_ACTION),
            exhaustMap((value: { user: User, password: string }) => {
                return this.authService
                    .signup(value.user, value.password)
                    .pipe(
                        map(data => signedupAction({ user: data }))
                    )
            })
        ))
    }
}

@Injectable()
export class FileEffects {
    upload$;

    constructor(private actions: Actions, private fileService: FileService) {
        this.upload$ = createEffect(() => this.actions.pipe(
            ofType(UPLOAD_PRODUCT_IMAGE),
            exhaustMap((value: { file: File[], product: Product }) => {
                return from(this.fileService.uploadFiles(value.file))
                    .pipe(
                        map(urls => {
                            return passImageUrlAction({ urls: urls, product: value.product });
                        })
                    )

            })
        ))
    }
}

@Injectable()
export class ProductEffects {
    add$;
    allProducts$;
    product$;
    topSellers$;

    constructor(private actions: Actions, private productService: ProductService) {
        this.add$ = createEffect(() => this.actions.pipe(
            ofType(ADD_PRODUCT),
            exhaustMap((value: { product: Product }) => {
                return this.productService.addProduct(value.product)
                    .pipe(
                        map(product => {
                            return productAddedAction({ product: product });
                        })
                    )
            })
        ));

        this.allProducts$ = createEffect(() => this.actions.pipe(
            ofType(GET_PRODUCTS),
            exhaustMap((value: { category: string, offset: number }) => {
                return forkJoin({
                    products: this.productService.getProductsByCategory(value.category, value.offset),
                    count: this.productService.getCountByCategory(value.category)
                }).pipe(
                    map(data => {
                        return gottenProductsAndCountAction({ products: data.products, count: data.count[0].count })
                    })
                )
            })

        ));

        this.product$ = createEffect(() => this.actions.pipe(
            ofType(GET_PRODUCT),
            exhaustMap((value: { objectId: string }) => {
                return this.productService.getProduct(value.objectId)
                    .pipe(map(data => {
                        return gottenProductAction({ product: data });
                    }))
            })
        ));

        this.topSellers$ = createEffect(() => this.actions.pipe(
            ofType(TOP_SELLERS),
            exhaustMap(() => {
                return this.productService.getTopSeller()
                .pipe(map(data => {
                    return gottenTopSellersAction({products: data});
                }))
            })
        ))
    }
}
