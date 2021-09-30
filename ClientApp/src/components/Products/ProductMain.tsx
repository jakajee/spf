import { useEffect } from "react";
import { connect } from "react-redux";
import { ProductActions } from "../../store/ProductsStore";
import ProductList from "./ProductList";

type ProductMainProps = typeof ProductActions;

function ProductMain(props: ProductMainProps) {
    useEffect(() => {
        props.requestProducts();
    }, []);
    return (
        <>            
            Product Main
            <ProductList />
        </>
    )
}

export default connect(
    null,
    ProductActions
)(ProductMain as any);