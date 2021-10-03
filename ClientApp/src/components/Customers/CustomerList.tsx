import { useSelector } from "react-redux"
import { ApplicationState } from "../../store"
import CustomerListItem from "./CustomerListItem";

export default () => {
    const customerState = useSelector((appState: ApplicationState) => appState.customerState);
    const customerItems = customerState.customers.map((item, idx) => <CustomerListItem key={item.id} idx={idx} {...item} />)

    return (
        <table className="table table-bordered table-sm table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>ชื่อลูกค้า</th>
                    <th>ที่อยู่</th>
                    <th>เลขประจำตัวผู้เสียภาษีอากร</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {customerItems}
            </tbody>
        </table>
    )
}