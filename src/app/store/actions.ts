import { createAction, props } from "@ngrx/store"
import { Product } from "../model/product";
import { User } from "../model/user";
import { CartProduct } from "../model/cart-product";

export const LOGIN_ACTION = '[Login Component] login';
export const LOGGED_IN_ACTION = '[Effect] logged in successfully';
export const UPLOAD_PRODUCT_IMAGE = '[Add Product Component] upload product image';
export const PASS_IMAGE_URL = '[Effect] pass product image url';
export const ADD_PRODUCT = '[Add Product Component] add product to database';
export const PRODUCT_ADDED = '[Effect] product has been added';
export const GET_PRODUCTS = '[Shop Component] get products by category';
export const GET_PRODUCT = '[ProductPage Component] get product';
export const GOTTEN_PRODUCTS = '[Effect] gotten products';
export const GOTTEN_PRODUCT = '[Effect] gotten product';
export const USER_TOKEN_VALIDATION = '[Component] validating user token';
export const VALIDATION_RESULT = '[Effect] validation result';
export const SIGNUP_ACTION = '[Signup Component] signup';
export const SIGNEDUP_ACTION = '[Effect] signed up successfully';
export const TOP_SELLERS = '[Home Component] get top sellers product';
export const GOTTEN_TOP_SELLERS = '[Effect] top seller products';
export const ADD_TO_CART = '[Cart Component] add to shop cart';
export const ADDED_TO_CART = '[Effect] added to cart';
export const GET_FROM_CART = '[Cart Component] get products from cart table';
export const GOTTEN_FROM_CART = '[Effect] gotten products from cart table';

export const loginAction = createAction(LOGIN_ACTION, props<{ email: string, password: string }>());

export const loggedInAction = createAction(
    LOGGED_IN_ACTION,
    props<{ email: string; objectId: string; userToken: string; userType: string }>()
);

export const uploadProductImageAction = createAction(UPLOAD_PRODUCT_IMAGE, props<{ file: File[], product: Product }>());

export const passImageUrlAction = createAction(PASS_IMAGE_URL, props<{ urls: string[], product: Product }>());

export const addProductAction = createAction(ADD_PRODUCT, props<{ product: Product }>());

export const productAddedAction = createAction(PRODUCT_ADDED, props<{ product: Product }>());

export const emptyStateAction = createAction('empty state');

export const getProductsByCategoryAction = createAction(GET_PRODUCTS, props<{ category: string, offset: number }>());

export const getProductAction = createAction(GET_PRODUCT, props<{ objectId: string }>());

export const gottenProductsAndCountAction = createAction(GOTTEN_PRODUCTS, props<{ products: Product[], count: number }>());

export const gottenProductAction = createAction(GOTTEN_PRODUCT, props<{ product: Product }>());

export const userTokenValidationAction = createAction(USER_TOKEN_VALIDATION);

export const validationResultAction = createAction(VALIDATION_RESULT, props<{ valid: boolean }>());

export const signupAction = createAction(SIGNUP_ACTION, props<{ user: User, password: string }>());

export const signedupAction = createAction(SIGNEDUP_ACTION, props<{ user: User }>());

export const topSellersAction = createAction(TOP_SELLERS);

export const gottenTopSellersAction = createAction(GOTTEN_TOP_SELLERS, props<{ products: Product[] }>());

export const addToCartAction = createAction(ADD_TO_CART, props<{ product: CartProduct; }>());

export const addedToCartAction = createAction(ADDED_TO_CART, props<{objectId: string}>());

export const getProductsFromCartAction = createAction(GET_FROM_CART);

export const gottenProductsFromCartAction = createAction(GOTTEN_FROM_CART, props<{products: Product[]}>())