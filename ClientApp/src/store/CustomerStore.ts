import { Reducer } from "redux";
import CustomerAction, { CustomerCombinedAction } from "./factory/CustomerAction";

export interface CustomerModel {
    id: string | null,
    fullName: string ,
    address1: string,
    address2: string,
    taxNumber: string
}

export interface CustomerState {
    customers: CustomerModel[]
    selectedCustomer: CustomerModel | null,
}

export const CustomerActions = {
    getAllCustomers: () => CustomerAction.requestAll(),
    selectCustomer: (customer: CustomerModel) => CustomerAction.selectedModel(customer),
    deleteCustomer: (id: string | null) => CustomerAction.deleteModel(id),
    createCustomer: (customer: CustomerModel) => CustomerAction.createModel(customer),
    updateCustomer: (customer: CustomerModel) => CustomerAction.updateModel(customer)
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