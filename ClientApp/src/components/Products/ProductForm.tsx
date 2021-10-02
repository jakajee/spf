import React from "react"
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select/dist/declarations/src/Select";
import { ApplicationState } from "../../store";
import { ProductActions, ProductModel } from "../../store/ProductsStore";
import Icon from "../../util/Icon";

function getInitialForm(): ProductModel {
    return {
        id: null,
        name: "",
        unit: null
    };
}

function ProductForm() {
    const state = useSelector((state: ApplicationState) => state.productState);
    const dispatch = useDispatch();
    const productModel = state?.selectedProduct || getInitialForm();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!productModel.id) {
            dispatch(
                ProductActions.createProduct(productModel)
            );
        }
    }

    const onReset = () => {
        dispatch(
            ProductActions.selectProduct({
                ...getInitialForm()
            })
        )
    }

    const onNameChange = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch(
            ProductActions.selectProduct({
                ...productModel,
                name: e.target.value
            })
        )
    }

    return (
        <>
            <form onSubmit={onSubmit} onReset={onReset} className="mb-3">
                <fieldset>
                    <legend>{productModel.id ? "แก้ไขข้อมูลสินค้า" : "เพิ่มข้อมูลสินค้า"}</legend>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">ชื่อสินค้า</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={productModel.name}
                                onChange={onNameChange}
                            />
                        </div>
                        <div className="col">
                            <label className="form-label">หน่วย</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-success me-2">
                                <Icon name="check-circle" />
                                บันทึก
                            </button>
                            <button type="reset" className="btn btn-secondary">
                                <Icon name="arrow-counterclockwise" />
                                เคลียร์
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </>
    )
}

export default ProductForm;