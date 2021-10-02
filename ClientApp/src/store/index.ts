import * as CustomerStore from './CustomerStore';
import * as ProductStore from './ProductsStore';
import * as UtilStore from './UtilStore';
// import * as Counter from './Counter';

// // The top-level state object
export interface ApplicationState {
    productState: ProductStore.ProductState;
    customerState: CustomerStore.CustomerState;
    utilState: UtilStore.LoadingState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    productState: ProductStore.ProductReducers,
    customerState: CustomerStore.CustomerReducers,
    utilState: UtilStore.UtilReducers
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
