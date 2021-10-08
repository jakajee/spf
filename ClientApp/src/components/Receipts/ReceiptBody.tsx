import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { Option } from "../../hooks/BaseModel";
import { useProductList } from "../../hooks/MasterData";
import Icon from "../../util/Icon";
import ReceiptBodyItem, { ReceiptBodyItemModel } from "./ReceiptBodyItem";

interface ReceiptBodyProps {
    receiptBodyItems: ReceiptBodyItemModel[],
    onAddItem: (newItem: ReceiptBodyItemModel) => void,
    onRemoveItem: (itemId: string) => void
}

const defaultTransaction: ReceiptBodyItemModel = {
    id: null,
    name: "",
    price: 0,
    unit: null,
    qty: 0,
    total: 0
}

export default (props: ReceiptBodyProps) => {
    const products = useProductList();
    const productsOptions: Option[] = products.map(item => {
        return {
            label: item.name,
            value: item.id || ""
        }
    });

    const [transaction, setTransaction] = useState<ReceiptBodyItemModel>(defaultTransaction)
    const { qty, price } = transaction;

     const [optionProduct, setSelectOptionProduct] = useState<SingleValue<Option>>(null);

    useEffect(() => {
        if (qty > 0 && price > 0) {
            setTransaction({
                ...transaction,
                total: qty * price
            })
        }
    }, [qty, price]);

    useEffect(() => {
        setProduct(optionProduct?.value as string);
    }, [optionProduct])

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isInvalid()) {
            alert("กรอกข้อมูลไม่ครบ");
            return;
        }
        props.onAddItem(transaction);
        setTransaction({ ...defaultTransaction });
        setSelectOptionProduct(null);
    }

    function updateModelValue(e: React.FocusEvent<HTMLInputElement>) {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        })
    }

    function setProduct(productId?: string) {
        const data = products.filter(e => e.id === productId)[0];
        setTransaction({
            ...transaction,
            ...data
        });
    }

    function isInvalid() {
        return [
            !!transaction.id,
            !!transaction.name,
            !!price,
            !!qty,
            !!transaction.total,
            !!transaction.unit
        ].indexOf(false) > -1
    }

    const receiptBodyItems = props.receiptBodyItems.map((item, idx) => <ReceiptBodyItem key={idx} {...item} idx={idx + 1} onRemoveProduct={props.onRemoveItem} />)
    return <>
        <fieldset className="mb-2">
            <legend>รายการสินค้า</legend>
            <form onSubmit={onSubmit}>
                <div className="row mb-2">
                    <div className="col-6">
                        <label className="form-label required">สินค้า</label>
                        <Select 
                            options={productsOptions} 
                            onChange={(newValue) => setSelectOptionProduct(newValue)} 
                            value={optionProduct}
                        />
                    </div>
                    <div className="col-2">
                        <label className="form-label required">จำนวน</label>
                        <div className="input-group input-group-sm">
                            <input type="text" name="qty" className="form-control form-control-sm text-end" onChange={updateModelValue}
                                value={qty} />
                            <span className="input-group-text">{transaction.unit?.name || "-"}</span>
                        </div>
                    </div>
                    <div className="col-2">
                        <label className="form-label required">ราคาต่อหน่วย</label>
                        <div className="input-group input-group-sm">
                            <input type="text" name="price" className="form-control form-control-sm text-end" onChange={updateModelValue}
                                value={price} />
                            <span className="input-group-text">.-</span>
                        </div>
                    </div>
                    <div className="col-2">
                        <label className="form-label required">จำนวนเงิน</label>
                        <div className="input-group input-group-sm">
                            <input type="text" name="total" className="form-control form-control-sm text-end" onChange={updateModelValue} value={transaction.total} />
                            <span className="input-group-text">.-</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-sm btn-success" disabled={isInvalid()}>
                            <Icon name="plus-circle" />
                            เพิ่ม
                        </button>
                    </div>
                </div>
            </form>
        </fieldset>

        <table className="table table-bordered table-sm table-hover">
            <thead className="table-primary">
                <tr>
                    <th></th>
                    <th>รายการสินค้า</th>
                    <th>จำนวน</th>
                    <th>ราคาต่อหน่วย</th>
                    <th>จำนวนเงิน</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {receiptBodyItems}
            </tbody>
        </table>
    </>;
}