import { useEffect, useState } from "react"
import api from "../api";
import { BaseDropdown, Option } from "./BaseModel";



export type Unit = BaseDropdown;

export type Payment = BaseDropdown;

function getSystemData(action: string): Option[] {

    const [datas, setDatas] = useState<Option[]>([]);
    useEffect(() => {
        (async () => {
            const response = await api.get<BaseDropdown[]>(`system/${action}`);
            const result = response.data.map<Option>((item: BaseDropdown) => {
                return {
                    label: item.name,
                    value: item.id
                }
            })

            setDatas(result);
        })();
    }, []);
    return datas;
}

export const useDropdownUnits = () => getSystemData("getunits");
export const useDropdownPayments = () => getSystemData("getpayments");