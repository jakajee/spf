import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { ProductActions, ProductModel } from "../../store/ProductsStore"
import Icon from "../../util/Icon";

type ProductListItemProps = ProductModel & { no: number };

export default (props: ProductListItemProps) => {
    const productId = useSelector((state: ApplicationState) => state.productState?.selectedProduct?.id);
    const dispatch = useDispatch()

    const onSelectProduct = () => {
        dispatch(
            ProductActions.selectProduct(props)
        );
    }

    const onRemoveProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (confirm("ลบสินค้านี้ใช่หรือไม่?")) {
            dispatch(
                ProductActions.deleteProduct(props.id)
            );
        }
    }

    const selected = props.id === productId ? "table-dark" : "";

    return (
        <>
            <tr style={{ cursor: "pointer" }} onClick={onSelectProduct} className={selected}>
                <td className="text-center">{props.no}</td>
                <td>{props.name}</td>
                <td>{new Intl.NumberFormat("en-US").format(props.price)}</td>
                <td>{props.unit?.name}</td>
                <td className="text-center">
                    <button type="button" className="btn btn-sm btn-danger" onClick={onRemoveProduct}>
                        <Icon name="x-circle" />
                        ลบ
                    </button>
                </td>
            </tr>
        </>
    )
}