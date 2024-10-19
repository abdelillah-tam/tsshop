import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../model/product";

const selectUserFeature = createFeatureSelector<{
    email: string;
    objectId: string;
    userToken: string;
    type: string;
    valid: boolean
}>('user');

export const userSelector = createSelector(selectUserFeature, (state) => state);

export const validationSelector = createSelector(selectUserFeature, (state) => state.valid);

const selectFileFeature = createFeatureSelector<{
    imageUrlOne: string;
    imageUrlTwo: string;
    imageUrlThree: string;
    imageUrlFour: string;
    product: Product
}>('file');

export const fileSelector = createSelector(selectFileFeature, state => state);

const selectProductFeature = createFeatureSelector<Product>('product');

export const productSelector = createSelector(selectProductFeature, state => state);

const selectProductsFeature = createFeatureSelector<{products:Product[]; count: number}>('products');

export const productsSelector = createSelector(selectProductsFeature, state => state);