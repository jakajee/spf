import { useSelector } from "react-redux"
import { ApplicationState } from "../../store"

export default () => {
    const customerState = useSelector((appState: ApplicationState) => appState.customerState);
    const customerItems = customerState.customers.map((item, idx) => {
        return <tr key={item.id}>
            <td>{idx + 1}</td>
            <td>{item.fullName}</td>
            <td>
                <div>{item.address1}</div>
                <div>{item.address2}</div>
            </td>
            <td>{item.taxNumber}</td>
        </tr>
    })

    return (
        <table className="table table-bordered table-sm table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th>ชื่อลูกค้า</th>
                    <th>ที่อยู่</th>
                    <th>เลขประจำตัวผู้เสียภาษีอากร</th>
                </tr>
            </thead>
            <tbody>
                {customerItems}
            </tbody>
        </table>
    )
}