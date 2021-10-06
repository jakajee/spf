import format from "date-fns/format";
import th from "date-fns/locale/th";
import { useState } from "react";
import { Payment } from "../../hooks/SystemData";
import { CustomerModel } from "../../store/CustomerStore";
import Icon from "../../util/Icon";
import ReceiptBody from "./ReceiptBody"
import { ReceiptBodyItemModel } from "./ReceiptBodyItem";
import ReceiptFooter from "./ReceiptFooter"
import ReceiptHeader, { ReceiptHeaderModel } from "./ReceiptHeader"

const defaultDate = format(Date.now(), "dd-MM-yy", { locale: th });

interface ReceiptMainState {
    receiptHeaderModel: ReceiptHeaderModel,
    receiptBodyModel: ReceiptBodyItemModel[]
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
        receiptBodyModel: []
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
        setReceiptModel({
            ...receiptModel,
            receiptBodyModel: [
                { ...item },
                ...receiptModel.receiptBodyModel
            ]
        })
    }

    return (
        <>
            <div className="card border-primary">
                <div className="card-header bg-primary border-primary text-white d-flex justify-content-between">
                    <span style={{ lineHeight: "2.3" }}>แบบฟอร์มข้อมูลใบกำกับภาษี/ใบเสร็จรับเงิน</span>
                    <button type="button" className="btn btn-sm btn-secondary text-white">
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
                    <ReceiptBody receiptBodyItems={receiptModel.receiptBodyModel} onAddItem={onAddReceiptBodyItem} />

                </div>
                <div className="card-footer">
                    <code>
                        {JSON.stringify(receiptModel)}
                    </code>
                    <ReceiptFooter />
                </div>

            </div>
        </>
    )
}