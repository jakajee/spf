import { connect } from "react-redux"
import { ApplicationState } from "../../store"
import { ProductState } from "../../store/ProductsStore"
import SimpleTable from "../../util/SimpleTable";
import ProductListItem from "./ProductListItem"

type ProductListProps = ProductState;

function ProductList({ products }: ProductListProps) {
    const productItems = products.map((item, idx) => <ProductListItem {...item} no={idx + 1} key={item.id} />)

    return (
        <>
            <SimpleTable.Table>
                <SimpleTable.THead>
                    <tr>
                        <th></th>
                        <th>ชื่อสินค้า</th>
                        <th>ราคา (บาท)</th>
                        <th>หน่วย</th>
                        <th style={{ width: 100 }}></th>
                    </tr>
                </SimpleTable.THead>
                <SimpleTable.TBody>
                    {productItems}
                </SimpleTable.TBody>
            </SimpleTable.Table>
        </>
    )
}

export default connect(
    (state: ApplicationState) => state.productState
)(ProductList as any)