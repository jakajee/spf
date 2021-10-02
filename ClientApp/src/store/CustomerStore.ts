
export interface CustomerModel {
    id: string | null,
    fullName: string | null,
    address1: string | null,
    address2: string | null,
    address3: string | null
}

export interface CustomerState {
    selectedCustomer: CustomerModel | null,
    customers: CustomerModel[]
}

interface RequestCustomerAction {
    type: 'REQ_CUSTOMER'
}

interface ResponseCustomerAction {
    type: 'RES_CUSTOMER',
    customers: CustomerModel[]
}

interface SelectCustomerAction {
    type: 'SELECT_CUSTOMER',
    selectedCustomer: CustomerModel
}

