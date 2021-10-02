import { Reducer } from "redux";
import { Unit } from '../hooks/SystemData';
import ProductAction, { ProductCombinedAction } from './factory/ProductAction';

export interface ProductState {
    selectedProduct: ProductModel | null,
    products: ProductModel[]
}

export interface ProductModel {
    id: string | null,
    name: string,
    unit: Unit | null
}

export const ProductActions = {
    requestProducts: () => ProductAction.requestAll(),
    selectProduct: (product: ProductModel) => ProductAction.selectedModel(product),
    deleteProduct: (id: string | null) => ProductAction.deleteModel(id),
    createProduct: (product: ProductModel) => ProductAction.createModel(product),
    updateProduct: (product: ProductModel) => ProductAction.updateModel(product)
}

const defaultState: ProductState = {
    products: [],
    selectedProduct: null
}

export const ProductReducers: Reducer<ProductState> = (state: ProductState = defaultState, action: ProductCombinedAction) => {
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