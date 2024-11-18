import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../model/product";
import { User } from "../model/user";

const selectUserFeature = createFeatureSelector<{
    user: User;
    userToken: string;
    valid: boolean
}>('user');

export const userSelector = createSelector(selectUserFeature, (state) => state);

export const validationSelector = createSelector(selectUserFeature, (state) => state.valid);

const selectFileFeature = createFeatureSelector<{
    imageUrlOne: string;
    imageUrlTwo: string;
    imageUrlThree: string;
    imageUrlFour: string;
    imageUrlFive: string;
    product: Product
}>('file');

export const fileSelector = createSelector(selectFileFeature, state => state);

const selectProductFeature = createFeatureSelector<Product>('product');

export const productSelector = createSelector(selectProductFeature, state => state);

const selectAddProductFeature = createFeatureSelector<Product>('addProduct');

export const addProductSelector = createSelector(selectAddProductFeature, state => state);

const selectProductsFeature = createFeatureSelector<{products:Product[]; count: number}>('products');

export const productsSelector = createSelector(selectProductsFeature, state => state);

const selectTopSellersFeature = createFeatureSelector<Product[]>('top');

export const topSellersSelector = createSelector(selectTopSellersFeature, state => state);

const selectAddedProductToCart = createFeatureSelector<string>('cart');

export const addedToCartSelector = createSelector(selectAddedProductToCart, state => state);

const selectCartProducts = createFeatureSelector<Product[]>('cartProducts');

export const cartProductsSelector = createSelector(selectCartProducts, state => state);