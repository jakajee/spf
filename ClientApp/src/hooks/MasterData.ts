import { useEffect, useState } from 'react';
import api from '../api';
import { CustomerModel } from '../store/CustomerStore';
import { ProductModel } from '../store/ProductsStore';
import { Option } from './BaseModel';


function getMasterData<TModel>(controller: string, mapping: (item: TModel) => Option) {
    const [datas, setDatas] = useState<Option[]>([]);
    useEffect(() => {
        (async () => {
            const response = await api.get<TModel[]>(`${controller}/getall`);
            const result = response.data.map<Option>(mapping);

            setDatas(result);
        })();
    }, []);
    return datas;
}

export const useCustomerList = 
    () => getMasterData<CustomerModel>("customers", item => ({
        label: item.fullName,
        value: item.id
    }));

export const useProductList = 
    () => getMasterData<ProductModel>("products", item => ({
        label: item.name,
        value: item.id
    }));