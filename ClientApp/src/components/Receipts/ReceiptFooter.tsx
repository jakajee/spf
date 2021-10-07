import { NumberValue } from "../../util/Number";


export interface ReceiptFooterModel {
    total: number,
    vat: number,
    grandTotal: number
}

export default (props: ReceiptFooterModel) => {
    return <>
        <div className="row">
            <div className="col"><strong>รวมมูลค่าสินค้า: </strong> <NumberValue value={props.total} /></div>
            <div className="col"><strong>ภาษี: </strong> <NumberValue value={props.vat} /></div>
            <div className="col"><strong>รวมเงิน: </strong> <NumberValue value={props.grandTotal} /></div>
        </div>
    </>;
}