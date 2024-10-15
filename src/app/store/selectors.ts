import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../model/product";

const selectUserFeature = createFeatureSelector<{ email: string; objectId: string; userToken: string; type: string }>('user');

export const userSelector = createSelector(selectUserFeature, (state) => state);

const selectFileFeature = createFeatureSelector<{
    imageUrlOne: string;
    imageUrlTwo: string;
    imageUrlThree: string;
    imageUrlFour: string;
}>('file');

export const fileSelector = createSelector(selectFileFeature, state => state);

const selectProductFeature = createFeatureSelector<Product>('product');

export const productSelector = createSelector(selectProductFeature, state => state);

const selectProductsFeature = createFeatureSelector<Product[]>('products');

export const productsSelector = createSelector(selectProductsFeature, state => state);