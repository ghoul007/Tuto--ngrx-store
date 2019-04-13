import { Product } from "../product";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.actions";
 

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    product: Product[];
    error: string;
}
const intialStat: ProductState = {
    showProductCode: true,
    currentProductId: null,
    product: [],
    error: ''
}
 

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
                currentProductId:  action.payload.id
            }
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null
            }
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0 
            }

        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                product: action.payload,
                error: ''
            }

        case ProductActionTypes.LoadFail:
            return {
                ...state,
                error: action.payload,
                product: []
            }


            case ProductActionTypes.UpdateProductSuccess:
            const updatedProducts = state.product.map(
              item => action.payload.id === item.id ? action.payload : item);
            return {
              ...state,
              product: updatedProducts,
              currentProductId: action.payload.id,
              error: ''
            };
      
          case ProductActionTypes.UpdateProductFail:
            return {
              ...state,
              error: action.payload
            };


        default:
            return state
    }
}