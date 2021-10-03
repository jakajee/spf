﻿import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../store";
import { CustomerActions, CustomerModel } from "../../store/CustomerStore"
import Icon from "../../util/Icon";

export default (props: CustomerModel & { idx: number }) => {
    const dispatch = useDispatch();
    const id = useSelector((appState: ApplicationState) => appState.customerState.selectedCustomer?.id)

    const onSelectCustomer = () => {
        dispatch(
            CustomerActions.selectCustomer(props as CustomerModel)
        );
    }

    const onRemoveCustomer = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (confirm("ลบข้อมูลลูกค้านี้ใช่หรือไม่?")) {
            dispatch(CustomerActions.deleteCustomer(props.id));
        }
    }

    const selected = props.id === id ? "table-primary" : "";

    return <tr style={{ cursor: "pointer" }} onClick={onSelectCustomer} className={selected}>
        <td>{props.idx + 1}</td>
        <td>{props.fullName}</td>
        <td>
            <div>{props.address1}</div>
            <div>{props.address2}</div>
        </td>
        <td>{props.taxNumber}</td>
        <td>
            <button type="button" className="btn btn-sm btn-secondary" onClick={onRemoveCustomer}>
                <Icon name="x-circle" />
                ลบ
            </button>
        </td>
    </tr>
}