import { connect } from "react-redux"
import { ApplicationState } from "../../store"
import { ProductState } from "../../store/ProductsStore"
import ProductListItem from "./ProductListItem"

type ProductListProps = ProductState;

function ProductList({ products }: ProductListProps) {    
    const productItems = products.map((item, idx) => <ProductListItem {...item} no={idx + 1} key={item.id} />)

    return (
        <>
            <table className="table table-bordered table-sm table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>ชื่อสินค้า</th>
                        <th>หน่วย</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productItems}
                </tbody>
            </table>
        </>
    )
}

export default connect(
    (state: ApplicationState) => state.productState
)(ProductList as any)