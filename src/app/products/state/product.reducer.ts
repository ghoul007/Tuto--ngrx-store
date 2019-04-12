import { Product } from "../product";
import * as fromRoot from '../../state/app.state'
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.actions";

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

const getPtoductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getPtoductFeatureState,
    state => state.showProductCode
)

export const getCurrentProduct = createSelector(
    getPtoductFeatureState,
    state => state.currentProduct
)

export const getProducts = createSelector(
    getPtoductFeatureState,
    state => state.product
)


export function reducer(state = intialStat, action: ProductActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            }
        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProduct: { ...action.payload }
            }
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProduct: null
            }
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProduct: {
                    id: 0,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 0
                }
            }

        default:
            return state
    }
}