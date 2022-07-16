import { Action } from "redux";
import api from "../api";
import { ReceiptMainState } from "../components/Receipts/ReceiptMain";
import { UtilActions } from "./UtilStore";
import printjs from 'print-js';

type ResponseHeader = {
    [key: string]: string
}

export async function printReceipt(receiptModel: ReceiptMainState, dispatch: (action: Action<any>) => void) {
    var requestModel = {
        receiptHeader: {
            receiptNumber: receiptModel.receiptHeaderModel.receiptNumber,
            receiptDate: receiptModel.receiptHeaderModel.receiptDate,
            dueDate: receiptModel.receiptHeaderModel.dueDate,
            payment: receiptModel.receiptHeaderModel.paymentModel?.name
        },
        customer: receiptModel.receiptHeaderModel.customerModel,
        productList: receiptModel.receiptBodyModel.map(p => ({
            productName: p.name,
            unitName: p.unit?.name,
            qty: p.qty,
            price: p.price,
            totalPrice: p.total
        })),
        receiptSummary: receiptModel.receiptFooterModel
    }

    dispatch(UtilActions.loading());
    const response = await api({
        url: '/receipts/downloadtaxinvoice',
        method: 'post',
        responseType: 'blob',
        data: requestModel
    });
    
    const fileName = (response.headers as ResponseHeader)["x-file-name"];
    dispatch(UtilActions.loaded(`กำลังพิมพ์ ${fileName}`, "success"))
    const url = window.URL.createObjectURL(new Blob([response.data], {
        type: "application/pdf"
    }));

    printjs(url);
}