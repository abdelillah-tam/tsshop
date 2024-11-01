import { createReducer, on } from "@ngrx/store"
import { addedToCartAction, emptyStateAction, gottenProductAction, gottenProductsAndCountAction, gottenProductsFromCartAction, gottenTopSellersAction, LOGGED_IN_ACTION, loggedInAction, passImageUrlAction, productAddedAction, signedupAction, validationResultAction } from "./actions"
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
    imageUrlFive: '',
    product: new Product('', '', '', '', '', '', '', '', 0, '', '', 0, 0)
}

export const initialProductState: Product = new Product('', '', '', '', '', '', '', '', 0, '', '', 0, 0);

export const initialAddProductState: Product = new Product('', '', '', '', '', '', '', '', 0, '', '', 0, 0);

export const initialProductsState: { products: Product[]; count: number } = { products: [], count: 0 };

export const initialTopSellersState: Product[] = [];

export const initialAddedToCart = '';

export const initialCartProducts : Product[] = [];
 
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
    }),
    on(signedupAction, (state, data) => {
        return {
            ...state,
            email: data.user.email
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
            imageUrlFive: data.urls[4],
            product: data.product
        }
    }),
    on(emptyStateAction, () => initialFileState)
);

export const productReducer = createReducer(initialProductState,
    on(emptyStateAction, () => initialProductState),
    on(gottenProductAction, (state, data) => data.product),
);

export const addProductReducer = createReducer(initialAddProductState,
    on(productAddedAction, (state, data) => {
        return data.product;
    }),
    on(emptyStateAction, () => initialAddProductState)
)

export const productsReducer = createReducer(initialProductsState,
    on(gottenProductsAndCountAction, (state, data) => data)
);

export const topSellerProductsReducer = createReducer(initialTopSellersState,
    on(gottenTopSellersAction, (state, data) => data.products)
);

export const addedToCartReducer = createReducer(initialAddedToCart,
    on(addedToCartAction, (state, data) => data.objectId)
);

export const productsFromCart = createReducer(initialCartProducts, 
    on(gottenProductsFromCartAction, (state, data) => data.products)
)