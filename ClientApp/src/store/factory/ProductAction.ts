import { AxiosResponse } from "axios";
import { ProductModel } from "../ProductsStore";
import BaseAction from "./BaseAction";

export interface RequestProductAction {
    type: 'REQ_PRODUCT'
}

export interface ResponseProductAction {
    type: 'RES_PRODUCT',
    products: ProductModel[]
}

export interface SelectProductAction {
    type: 'SELECT_PRODUCT',
    selectedProduct: ProductModel
}

export type ProductCombinedAction = RequestProductAction | ResponseProductAction | SelectProductAction;

class ProductAction extends BaseAction<ProductCombinedAction, ProductModel> {
    protected entityName: string = "สินค้า";    

    protected getRequestAllAction(): ProductCombinedAction {        
        return {
            type: 'REQ_PRODUCT'
        }
    }
    protected getResponseAllAction(response: AxiosResponse<any>): ProductCombinedAction {
        return {
            type: 'RES_PRODUCT',
            products: response.data
        }
    }
    protected getSelectModelAction(model: ProductModel): ProductCombinedAction {
        return {
            type: 'SELECT_PRODUCT',
            selectedProduct: model
        }
    }
}
export default new ProductAction('/products');