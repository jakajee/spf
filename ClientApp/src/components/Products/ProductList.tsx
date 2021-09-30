import { connect } from "react-redux"
import { ApplicationState } from "../../store"
import { ProductState } from "../../store/ProductsStore"
import Loading from "../../util/Loading";
import ProductListItem from "./ProductListItem"

type ProductListProps = ProductState;

function ProductList({ products, isLoading }: ProductListProps) {    
    const productItems = products.map(item => <ProductListItem {...item} />)

    return (
        <>
            {isLoading && <Loading type="info" />}
            <table className="table table-striped table-bordered table-sm">
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