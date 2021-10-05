import Select from "react-select";
import { useCustomerList } from "../../hooks/MasterData";

export default () => {
    const customers = useCustomerList();

    return <>
        <div>
            <Select options={customers} />             
        </div>
    </>;
}