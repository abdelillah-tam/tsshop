import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectFeature = createFeatureSelector<{ email: string; objectId: string; userToken: string; type: string}>('user');

export const userSelector = createSelector(selectFeature, (state) => state);