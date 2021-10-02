import { AxiosResponse } from "axios";
import { CustomerModel } from "../CustomerStore";
import BaseAction from "./BaseAction";

export interface RequestCustomerAction {
    type: 'REQ_ALL_CUSTOMERS'
}

export interface ResponseCustomerAction {
    type: 'RES_ALL_CUSTOMERS',
    customers: CustomerModel[]
}

export interface SelectCustomerAction {
    type: 'SELECT_CUSTOMER',
    selectedCustomer: CustomerModel
}

export type CustomerCombinedAction = RequestCustomerAction | ResponseCustomerAction | SelectCustomerAction;

class CustomerAction extends BaseAction<CustomerCombinedAction, CustomerModel> {   

    protected getCreateFailMessage(): string {
        return "เพิ่มข้อมูลลูกค้าล้มเหลว"
    }
    protected getUpdateFailMessage(): string {
        return "แก้ไขข้อมูลลูกค้าล้มเหลว"
    }    
    protected getRequestAllAction(): CustomerCombinedAction {        
        return {
            type: 'REQ_ALL_CUSTOMERS'
        }
    }
    protected getResponseAllAction(response: AxiosResponse<any>): CustomerCombinedAction {
        return {
            type: 'RES_ALL_CUSTOMERS',
            customers: response.data
        }
    }
    protected getSelectModelAction(model: CustomerModel): CustomerCombinedAction {
        return {
            type: 'SELECT_CUSTOMER',
            selectedCustomer: model
        }
    }
}
export default new CustomerAction('/customers');