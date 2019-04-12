import { Product } from "../product";
import * as fromRoot from '../../state/app.state'
import { createFeatureSelector , createSelector } from "@ngrx/store";

export interface State extends fromRoot.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    product: Product[];
}
const intialStat: ProductState = {
    showProductCode: true,
    currentProduct: null,
    product: []
}

const getPtoductFeatureState =  createFeatureSelector<ProductState>('products');

export const getShowProductCode =  createSelector(
    getPtoductFeatureState,
    state => state.showProductCode
)

export const getCurrentProduct =  createSelector(
    getPtoductFeatureState,
    state => state.currentProduct
)

export const getProducts =  createSelector(
    getPtoductFeatureState,
    state => state.product
)


export function reducer(state = intialStat, action): ProductState {
    switch (action.type) {
        case 'TOGGLE_PRODUCT_CODE':
            return {
                ...state,
                showProductCode: action.payload
            }

        default:
            return state
    }
}