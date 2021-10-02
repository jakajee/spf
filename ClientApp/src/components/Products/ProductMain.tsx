import { useEffect } from "react";
import { connect } from "react-redux";
import { ProductActions } from "../../store/ProductsStore";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

type ProductMainProps = typeof ProductActions;

function ProductMain(props: ProductMainProps) {
    useEffect(() => {
        props.requestProducts();
    }, []);
    return (
        <>            
            <ProductForm />
            <ProductList />
        </>
    )
}

export default connect(
    null,
    ProductActions
)(ProductMain as any);