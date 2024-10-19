import { createReducer, on } from "@ngrx/store"
import { emptyStateAction, gottenProductsAndCountAction, LOGGED_IN_ACTION, loggedInAction, passImageUrlAction, productAddedAction, validationResultAction } from "./actions"
import { Product } from "../model/product"

export const initialUserState = {
    email: '',
    objectId: '',
    userToken: '',
    type: '',
    valid: false
}

export const initialFileState = {
    imageUrlOne: '',
    imageUrlTwo: '',
    imageUrlThree: '',
    imageUrlFour: '',
    product: new Product('', '', '', '', '', '', '', '', 0, 0)
}

export const initialProductState: Product = new Product('', '', '', '', '', '', '', '', 0, 0);

export const initialProductsState: { products: Product[]; count: number } = { products: [], count: 0 };

export const userReducer = createReducer(initialUserState,
    on(loggedInAction, (state, data) => {
        return {
            ...state,
            email: data.email,
            objectId: data.objectId,
            userToken: data.userToken,
            type: data.userType
        }
    }),
    on(validationResultAction, (state, data) => {
        return {
            ...state,
            valid: data.valid
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
            product: data.product
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
    on(gottenProductsAndCountAction, (state, data) => data)
);