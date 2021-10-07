import format from "date-fns/format";
import _ from "lodash";
import { useState } from "react";
import { Payment } from "../../hooks/SystemData";
import { CustomerModel } from "../../store/CustomerStore";
import { printReceipt } from "../../store/ReceiptStore";
import { DATE_FORMAT } from "../../util/Format";
import Icon from "../../util/Icon";
import ReceiptBody from "./ReceiptBody"
import { ReceiptBodyItemModel } from "./ReceiptBodyItem";
import ReceiptFooter, { ReceiptFooterModel } from "./ReceiptFooter"
import ReceiptHeader, { ReceiptHeaderModel } from "./ReceiptHeader"

const defaultDate = format(Date.now(), DATE_FORMAT);

export interface ReceiptMainState {
    receiptHeaderModel: ReceiptHeaderModel,
    receiptBodyModel: ReceiptBodyItemModel[],
    receiptFooterModel: ReceiptFooterModel
}

export default () => {
    const [receiptModel, setReceiptModel] = useState<ReceiptMainState>({
        receiptHeaderModel: {
            dueDate: defaultDate,
            receiptDate: defaultDate,
            receiptNumber: "",
            customerModel: null,
            paymentModel: null
        },
        receiptBodyModel: [],
        receiptFooterModel: {
            grandTotal: 0,
            total: 0,
            vat: 0
        }
    });

    function onChangeDropDown<TModel>(modelName: "customerModel" | "paymentModel") {
        return (model: TModel) => {
            setReceiptModel({
                ...receiptModel,
                receiptHeaderModel: {
                    ...receiptModel.receiptHeaderModel,
                    [modelName]: {
                        ...model
                    }
                }
            })
        }
    }

    function onChangeHeaderModelValue(modelName: string, modelValue: string) {
        setReceiptModel({
            ...receiptModel,
            receiptHeaderModel: {
                ...receiptModel.receiptHeaderModel,
                [modelName]: modelValue
            }
        })
    }

    function onAddReceiptBodyItem(item: ReceiptBodyItemModel) {
        const receiptBodyModel = [
            { ...item },
            ...receiptModel.receiptBodyModel
        ];

        updateReceiptBodyItem(receiptBodyModel);
    }

    function onRemoveBodyItem(id: string) {
        const receiptBodyItems = receiptModel.receiptBodyModel.filter(e => e.id !== id);
        updateReceiptBodyItem(receiptBodyItems);
    }

    function updateReceiptBodyItem(receiptBodyModel: ReceiptBodyItemModel[]) {
        const receiptFooterModel = calculateTotal(receiptBodyModel)

        setReceiptModel({
            ...receiptModel,
            receiptBodyModel,
            receiptFooterModel
        })
    }

    function calculateTotal(receiptItems: ReceiptBodyItemModel[]): ReceiptFooterModel {
        const total = _.sumBy(receiptItems, "total");
        const vat = total * 0.07
        const grandTotal = (total + vat);
        return { total, vat, grandTotal }
    }

    function onClickPrint() {
        printReceipt(receiptModel);
    }

    return (
        <>
            <div className="card border-primary">
                <div className="card-header bg-primary border-primary text-white d-flex justify-content-between">
                    <span style={{ lineHeight: "2.3" }}>แบบฟอร์มข้อมูลใบกำกับภาษี/ใบเสร็จรับเงิน</span>
                    <button type="button" className="btn btn-sm btn-secondary text-white" onClick={onClickPrint}>
                        <Icon name="printer" marginRight={0} />
                    </button>
                </div>

                <div className="card-body">
                    <ReceiptHeader
                        onChangeCustomer={onChangeDropDown<CustomerModel>("customerModel")}
                        onChangePayment={onChangeDropDown<Payment>("paymentModel")}
                        onChangeModelValue={onChangeHeaderModelValue}
                        {...receiptModel.receiptHeaderModel}
                    />
                    <hr />
                    <ReceiptBody 
                        receiptBodyItems={receiptModel.receiptBodyModel} 
                        onAddItem={onAddReceiptBodyItem}
                        onRemoveItem={onRemoveBodyItem}
                    />

                </div>
                <div className="card-footer">
                    <ReceiptFooter {...receiptModel.receiptFooterModel} />
                </div>

            </div>
        </>
    )
}