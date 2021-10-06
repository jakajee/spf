import { useEffect, useState } from 'react';
import api from '../api';
import { CustomerModel } from '../store/CustomerStore';
import { ProductModel } from '../store/ProductsStore';


function getMasterData<TModel>(controller: string) {
    const [datas, setDatas] = useState<TModel[]>([]);
    useEffect(() => {
        (async () => {
            const response = await api.get<TModel[]>(`${controller}/getall`);
            setDatas(response.data);
        })();
    }, []);
    return datas;
}

export const useCustomerList = () => getMasterData<CustomerModel>("customers");

export const useProductList = () => getMasterData<ProductModel>("products");