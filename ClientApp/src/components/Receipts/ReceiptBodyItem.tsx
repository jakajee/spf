import { ProductModel } from "../../store/ProductsStore"
import Icon from "../../util/Icon"

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
            <td></td>
            <td>{props.name}</td>
            <td className="text-end">{props.qty} - {props.unit?.name}</td>
            <td className="text-end">{props.price}</td>
            <td className="text-end">{props.total}</td>
            <td className="text-center">
                <button type="button" className="btn btn-danger btn-sm" onClick={onClickRemove}>
                    <Icon name="x-circle" marginRight={0} />
                </button>
            </td>
        </tr>
    )
}