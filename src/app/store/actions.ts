import { createAction, props } from "@ngrx/store"
import { Product } from "../model/product";

export const LOGIN_ACTION = '[Login Component] login';
export const LOGGED_IN_ACTION = '[Effect] logged in successfully';
export const UPLOAD_PRODUCT_IMAGE = '[Add Product Component] upload product image';
export const PASS_IMAGE_URL = '[Effect] pass product image url';
export const ADD_PRODUCT = '[Add Product Component] add product to database';
export const PRODUCT_ADDED = '[Effect] product has been added';
export const GET_PRODUCTS = '[Shop Component] get products by category';
export const GOTTEN_PRODUCTS = '[Effect] gotten products';

export const loginAction = createAction(LOGIN_ACTION, props<{ email: string, password: string }>());

export const loggedInAction = createAction(
    LOGGED_IN_ACTION,
    props<{ email: string; objectId: string; userToken: string; userType: string }>()
);

export const uploadProductImageAction = createAction(UPLOAD_PRODUCT_IMAGE, props<{ file: File[] }>());

export const passImageUrlAction = createAction(PASS_IMAGE_URL, props<{ urls: string[] }>());

export const addProductAction = createAction(ADD_PRODUCT, props<{ product: Product }>());

export const productAddedAction = createAction(PRODUCT_ADDED, props<{ product: Product }>());

export const emptyStateAction = createAction('empty state');

export const getProductsByCategoryAction = createAction(GET_PRODUCTS, props<{ category: string }>());

export const gottenProductsAction = createAction(GOTTEN_PRODUCTS, props<{ products: Product[] }>());