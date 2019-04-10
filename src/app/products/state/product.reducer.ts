import { Product } from "../product";
import * as fromRoot from '../../state/app.state'

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