import { Reducer } from "redux";
import CustomerAction, { CustomerCombinedAction } from "./factory/CustomerAction";

export interface CustomerModel {
    id: string | null,
    fullName: string | null,
    address1: string | null,
    address2: string | null,
    taxNumber: string | null
}

export interface CustomerState {
    customers: CustomerModel[]
    selectedCustomer: CustomerModel | null,
}

export const CustomerActions = {
    getAllCustomers: () => CustomerAction.requestAll(),
    selectCustomer: (product: CustomerModel) => CustomerAction.selectedModel(product),
    deleteCustomer: (id: string | null) => CustomerAction.deleteModel(id),
    createCustomer: (product: CustomerModel) => CustomerAction.createModel(product),
    updateCustomer: (product: CustomerModel) => CustomerAction.updateModel(product)
}

const defaultState: CustomerState = {
    customers: [],
    selectedCustomer: null
}

export const CustomerReducers: Reducer<CustomerState> = (state: CustomerState = defaultState, action: CustomerCombinedAction) => {
    switch (action.type) {
        case 'REQ_ALL_CUSTOMERS': return { ...defaultState, isLoading: true };
        case 'RES_ALL_CUSTOMERS': return {
            customers: action.customers,
            selectedCustomer: null
        }
        case 'SELECT_CUSTOMER': return {
            ...state,
            selectedCustomer: action.selectedCustomer
        }
        default: return state;
    }
}