import { useEffect, useState } from "react"
import api from "../api";

interface BaseDropdown {
    id: number | null,
    name: string | null
}

export interface Option {
    value: number | null,
    label: string | null
}

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