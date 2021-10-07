import numeral from "numeral";
import api from "../api";
import { ReceiptMainState } from "../components/Receipts/ReceiptMain";

type ResponseHeader = {
    [key: string]: string
}

export function printReceipt(receiptModel: ReceiptMainState) {
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
    api({
        url: '/receipts/downloadtaxinvoice',
        method: 'post',
        responseType: 'blob',
        data: requestModel
    }).then(response => {
        const fileName = (response.headers as ResponseHeader)["x-file-name"];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    });
}