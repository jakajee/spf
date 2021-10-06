import React, { useState } from "react";
import Select from "react-select";
import { BaseOptionReadonly } from "../../hooks/BaseModel";
import { useProductList } from "../../hooks/MasterData";
import Icon from "../../util/Icon";
import ReceiptBodyItem, { ReceiptBodyItemModel } from "./ReceiptBodyItem";


interface ReceiptBodyProps {
    receiptBodyItems: ReceiptBodyItemModel[],
    onAddItem: (newItem: ReceiptBodyItemModel) => void
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
    const productsOptions: readonly BaseOptionReadonly<string>[] = products.map(item => {
        return {
            label: item.name,
            value: item.id || ""
        }
    });

    const [transaction, setTransaction] = useState<ReceiptBodyItemModel>(defaultTransaction)

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.onAddItem(transaction);
        setTransaction({ ...defaultTransaction })
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

    const receiptBodyItems = props.receiptBodyItems.map((item, idx) => <ReceiptBodyItem {...item} idx={idx + 1} />)
    return <>
        <fieldset className="mb-2">
            <legend>รายการสินค้า</legend>
            <form onSubmit={onSubmit}>
                <div className="row mb-2">
                    <div className="col-6">
                        <label className="form-label required">สินค้า</label>
                        <Select options={productsOptions} defaultValue={productsOptions[0]}
                            onChange={(newValue) => setProduct(newValue?.value)}
                        />
                    </div>
                    <div className="col-2">
                        <label className="form-label required">จำนวน</label>
                        <div className="input-group input-group-sm">
                            <input type="text" name="qty" className="form-control form-control-sm text-end" onChange={updateModelValue}
                                value={transaction.qty} />
                            <span className="input-group-text">{transaction.unit?.name || "-"}</span>
                        </div>
                    </div>
                    <div className="col-2">
                        <label className="form-label required">ราคาต่อหน่วย</label>
                        <div className="input-group input-group-sm">
                            <input type="text" name="price" className="form-control form-control-sm text-end" onChange={updateModelValue}
                                value={transaction.price} />
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
                        <button type="submit" className="btn btn-sm btn-success">
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