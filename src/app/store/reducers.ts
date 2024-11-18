import { createReducer, on } from '@ngrx/store';
import {
  addedToCartAction,
  emptyStateAction,
  gottenProductAction,
  gottenProductsAndCountAction,
  gottenProductsFromCartAction,
  gottenTopSellersAction,
  gottenUserAction,
  loggedInAction,
  passImageUrlAction,
  productAddedAction,
  signedupAction,
  validationResultAction,
} from './actions';
import { Product } from '../model/product';

export const initialUserState = {
  user: {},
  userToken: '',
  valid: false,
};

export const initialFileState = {
  imageUrlOne: '',
  imageUrlTwo: '',
  imageUrlThree: '',
  imageUrlFour: '',
  imageUrlFive: '',
  product: {},
};

export const initialProductState: Product = {
  objectId: '',
  productCategory: '',
  productDescription: '',
  productID: '',
  productImageUrlFive: '',
  productImageUrlFour: '',
  productImageUrlThree: '',
  productImageUrlTwo: '',
  productImageUrlOne: '',
  productPrice: 0,
  productQuantity: 0,
  productSells: 0,
  productTitle: '',
};

export const initialAddProductState: Product = {
  objectId: '',
  productCategory: '',
  productDescription: '',
  productID: '',
  productImageUrlFive: '',
  productImageUrlFour: '',
  productImageUrlThree: '',
  productImageUrlTwo: '',
  productImageUrlOne: '',
  productPrice: 0,
  productQuantity: 0,
  productSells: 0,
  productTitle: '',
};

export const initialProductsState: { products: Product[]; count: number } = {
  products: [],
  count: 0,
};

export const initialTopSellersState: Product[] = [];

export const initialAddedToCart = '';

export const initialCartProducts: Product[] = [];

export const userReducer = createReducer(
  initialUserState,
  on(loggedInAction, (state, data) => {
    return {
      ...state,
      user: {
        email: data.email,
        objectId: data.objectId,
      },
      userToken: data.userToken,
      type: data.userType,
    };
  }),
  on(validationResultAction, (state, data) => {
    return {
      ...state,
      valid: data.valid,
    };
  }),
  on(signedupAction, (state, data) => {
    return {
      ...state,
      user: data.user,
      valid: false,
    };
  }),
  on(gottenUserAction, (state, data) => {
    return {
      ...state,
      user: data.user,
    };
  }),
  on(emptyStateAction, (state) => {
    return initialUserState;
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
      product: data.product,
    };
  }),
  on(emptyStateAction, () => initialFileState)
);

export const productReducer = createReducer(
  initialProductState,
  on(emptyStateAction, () => initialProductState),
  on(gottenProductAction, (state, data) => data.product)
);

export const addProductReducer = createReducer(
  initialAddProductState,
  on(productAddedAction, (state, data) => {
    return data.product;
  }),
  on(emptyStateAction, () => initialAddProductState)
);

export const productsReducer = createReducer(
  initialProductsState,
  on(gottenProductsAndCountAction, (state, data) => data)
);

export const topSellerProductsReducer = createReducer(
  initialTopSellersState,
  on(gottenTopSellersAction, (state, data) => data.products)
);

export const addedToCartReducer = createReducer(
  initialAddedToCart,
  on(addedToCartAction, (state, data) => data.objectId)
);

export const productsFromCart = createReducer(
  initialCartProducts,
  on(gottenProductsFromCartAction, (state, data) => data.products)
);
