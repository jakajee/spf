import React from "react"
import { useDispatch, useSelector } from "react-redux";
import Select, { SingleValue } from "react-select";
import { Option } from "../../hooks/BaseModel";
import { useDropdownUnits } from "../../hooks/SystemData";
import { ApplicationState } from "../../store";
import { ProductActions, ProductModel } from "../../store/ProductsStore";
import { ReactSelectStyleFormat } from "../../util/Format";
import Icon from "../../util/Icon";

function getInitialForm(): ProductModel {
    return {
        id: null,
        name: "",
        unit: null,
        price: 0
    };
}

function ProductForm() {
    const state = useSelector((state: ApplicationState) => state.productState);
    const dispatch = useDispatch();
    const productModel = state?.selectedProduct || getInitialForm();
    const units = useDropdownUnits();
    const unitValue: Option = {
        value: state?.selectedProduct?.unit?.id || null,
        label: state?.selectedProduct?.unit?.name || null
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!productModel.id) {
            dispatch(
                ProductActions.createProduct(productModel)
            );
        } else {
            dispatch(
                ProductActions.updateProduct(productModel)
            )
        }
    }

    const onReset = () => {
        dispatch(
            ProductActions.selectProduct({
                ...getInitialForm()
            })
        )
    }

    const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch(
            ProductActions.selectProduct({
                ...productModel,
                [e.target.name]: e.target.value
            })
        )
    }

    const onUnitChange = (newValue: SingleValue<Option>) => {
        const { label, value } = newValue || { label: null, value: null };

        dispatch(
            ProductActions.selectProduct({
                ...productModel,
                unit: {
                    id: value as number | null,
                    name: label
                }
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
                            <label className="form-label required">ชื่อสินค้า</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control form-control-sm"
                                value={productModel.name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col">
                            <label className="form-label required">ราคา</label>
                            <input
                                type="number"
                                name="price"
                                className="form-control form-control-sm"
                                value={productModel.price}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col">
                            <label className="form-label required">หน่วย</label>
                            <Select options={units} onChange={onUnitChange} value={unitValue} styles={ReactSelectStyleFormat} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-sm btn-success me-2" disabled={!productModel.unit || !productModel.name}>
                                <Icon name="check-circle" />
                                บันทึก
                            </button>
                            <button type="reset" className="btn btn-sm btn-secondary">
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