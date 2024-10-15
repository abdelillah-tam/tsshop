import { createReducer, on } from "@ngrx/store"
import { emptyStateAction, gottenProductsAction, LOGGED_IN_ACTION, loggedInAction, passImageUrlAction, productAddedAction } from "./actions"
import { Product } from "../model/product"

export const initialUserState = {
    email: '',
    objectId: '',
    userToken: '',
    type: ''
}

export const initialFileState = {
    imageUrlOne: '',
    imageUrlTwo: '',
    imageUrlThree: '',
    imageUrlFour: ''
}

export const initialProductState: Product = new Product('', '', '', '', '', '', '', '', 0, 0);

export const initialProductsState: Product[] = [];

export const userReducer = createReducer(initialUserState,
    on(loggedInAction, (state, data) => {
        return {
            ...state,
            email: data.email,
            objectId: data.objectId,
            userToken: data.userToken,
            type: data.userType
        }
    })
);

export const fileReducer = createReducer(
    initialFileState,
    on(passImageUrlAction, (state, data) => {
        return {
            ...state,
            imageUrlOne: data.urls[0],
            imageUrlTwo: data.urls[1],
            imageUrlThree: data.urls[2],
            imageUrlFour: data.urls[3],
        }
    }),
    on(emptyStateAction, () => initialFileState)
);

export const productReducer = createReducer(initialProductState,
    on(productAddedAction, (state, data) => {
        return data.product;
    }),
    on(emptyStateAction, () => initialProductState)
)

export const productsReducer = createReducer(initialProductsState,
    on(gottenProductsAction, (state, data) => data.products)
);