import { Unit } from "./Unit";
import { AppThunkAction } from './';
import api from "../api";
import { Reducer } from "redux";

export interface ProductState {
    selectedProduct?: ProductModel | null,
    products: ProductModel[],
    isLoading: boolean
}

export interface ProductModel {
    id: string,
    name: string,
    unit: Unit
}

interface RequestProductAction {
    type: 'REQ_PRODUCT'
}

interface ResponseProductAction {
    type: 'RES_PRODUCT',
    products: ProductModel[]
}

interface SelectProductAction {
    type: 'SELECT_PRODUCT',
    selectedProduct: ProductModel
}

type KnownAction = RequestProductAction | ResponseProductAction | SelectProductAction;

export const ProductActions = {
    requestProducts: (): AppThunkAction<KnownAction> => async (dispatch) => {

        dispatch({ type: 'REQ_PRODUCT' });

        try {
            const response = await api.get("/products/getall")
            dispatch({
                type: 'RES_PRODUCT',
                products: response.data
            })
        } catch (error) {
            dispatch({
                type: 'RES_PRODUCT',
                products: []
            })
        }   


    }
}

const defaultState: ProductState = {
    isLoading: false,
    products: [],
    selectedProduct: null
}

export const ProductReducers: Reducer<ProductState> = (state: ProductState = defaultState, action: KnownAction) => {
    switch (action.type) {
        case 'REQ_PRODUCT': return { ...defaultState, isLoading: true };
        case 'RES_PRODUCT': return {
            isLoading: false,
            products: action.products,
            selectedProduct: null
        }
        case 'SELECT_PRODUCT': return {
            ...state,
            selectedProduct: action.selectedProduct
        }
        default: return state;
    }
}