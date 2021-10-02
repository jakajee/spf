import { AppThunkAction } from './';
import api, { BaseResponse } from "../api";
import { Reducer } from "redux";
import { LoadingAction, LoadedAction } from "./UtilStore";
import { Unit } from '../hooks/SystemData';

export interface ProductState {
    selectedProduct: ProductModel | null,
    products: ProductModel[]
}

export interface ProductModel {
    id: string | null,
    name: string,
    unit: Unit | null
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

type KnownAction = RequestProductAction | ResponseProductAction | SelectProductAction | LoadingAction | LoadedAction;

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
    },

    selectProduct: (selectedProduct: ProductModel) => {
        const action: SelectProductAction = {
            type: 'SELECT_PRODUCT',
            selectedProduct
        }

        return action;
    },

    deleteProduct: (id: string | null): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({ type: 'LOADING' })
        const response = await api.post<BaseResponse>(`/products/delete?id=${id}`);
        dispatch({ type: 'LOADED', message: response.data.message, serverity: 'success'})

        if (response.data.isSuccess) {
            ProductActions.requestProducts()(dispatch, getState);
        }
    },

    createProduct: (productModel: ProductModel): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({ type: 'LOADING' })
        const response = await api.post<BaseResponse>(`/products/create`, productModel);

        if (response.data.isSuccess) {
            dispatch({ type: 'LOADED', message: response.data.message, serverity: 'success'});
            ProductActions.requestProducts()(dispatch, getState);
        }else {
            dispatch({ type: 'LOADED', message: `เพิ่มข้อมูลสินค้าล้มเหลว: ${response.data.message}`, serverity: 'warning'});
        }
    },

    updateProduct: (productModel: ProductModel): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({ type: 'LOADING' })
        const response = await api.post<BaseResponse>(`/products/update`, productModel);

        if (response.data.isSuccess) {
            dispatch({ type: 'LOADED', message: response.data.message, serverity: 'success' });
            ProductActions.requestProducts()(dispatch, getState);
        } else {
            dispatch({ type: 'LOADED', message: `แก้ไขข้อมูลสินค้าล้มเหลว: ${response.data.message}`, serverity: 'warning' });
        }
    },
}

const defaultState: ProductState = {
    products: [],
    selectedProduct: null
}

export const ProductReducers: Reducer<ProductState> = (state: ProductState = defaultState, action: KnownAction) => {
    switch (action.type) {
        case 'REQ_PRODUCT': return { ...defaultState, isLoading: true };
        case 'RES_PRODUCT': return {
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