import { ProductModel } from "../../store/ProductsStore"
import Icon from "../../util/Icon"
import { NumberValue } from "../../util/Number";

export interface ReceiptBodyItemModel extends ProductModel {
    qty: number,
    total: number
}

export default (props: ReceiptBodyItemModel & {
    idx: number,
    onRemoveProduct: (id: string) => void
}) => {
    function onClickRemove() {
        props.onRemoveProduct(props.id as string);
    }

    return (
        <tr>
            <td>{props.idx}</td>
            <td>{props.name}</td>
            <td className="text-end"><NumberValue value={props.qty} format="0,0" /> - {props.unit?.name}</td>
            <td className="text-end"><NumberValue value={props.price} /></td>
            <td className="text-end"><NumberValue value={props.total} /></td>
            <td className="text-center">
                <button type="button" className="btn btn-danger btn-sm" onClick={onClickRemove}>
                    <Icon name="x-circle" marginRight={0} />
                </button>
            </td>
        </tr>
    )
}