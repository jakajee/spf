import Select from "react-select";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { Option } from "../../hooks/BaseModel";
import { useCustomerList } from "../../hooks/MasterData";
import { Payment, useDropdownPayments } from "../../hooks/SystemData";
import { CustomerModel } from "../../store/CustomerStore";
import "react-datepicker/dist/react-datepicker.css";
import { DATE_FORMAT } from "../../util/Format";

const formatDate = DATE_FORMAT;

export interface ReceiptHeaderModel {
    receiptNumber: string,
    receiptDate: string | undefined
    dueDate: string | undefined,
    paymentModel: Payment | null,
    customerModel: CustomerModel | null,
}

interface ReceiptHeaderProps extends ReceiptHeaderModel {
    onChangeModelValue: (modelName: string, newValue: string) => void,
    onChangeCustomer: (customerModel: CustomerModel) => void,
    onChangePayment: (paymentModel: Payment) => void
}

export default (props: ReceiptHeaderProps) => {
    const customers = useCustomerList();
    const payments = useDropdownPayments();

    const customerDs = customers.map<Option>(item => ({
        value: item.id,
        label: item.fullName
    }));

    const customer = props.customerModel;

    function getCustomerById(customerId: string) {
        return customers.filter(e => e.id === customerId)[0];
    }

    function getPaymentById(paymentId: number | string | null | undefined): Payment {
        const data = payments.filter(e => e.value === paymentId)[0];
        return {
            id: data.value as number,
            name: data.label
        }
    }

    return <>
        <fieldset>
            <legend>ข้อมูลลูกค้า</legend>
            <div className="row">
                <div className="col-7">
                    <div className="row">
                        <div className="col">
                            <label className="form-label required">ลูกค้า</label>
                            <Select
                                options={customerDs}
                                onChange={(newVal) => props.onChangeCustomer(getCustomerById(newVal?.value as string))}
                            />
                            {customer && <>
                                <input type="text" className="form-control form-control-sm" value={customer.address1} readOnly />
                                <input type="text" className="form-control form-control-sm" value={customer.address2} readOnly />
                                <input type="text" className="form-control form-control-sm" value={`เลขประจำตัวผู้เสียภาษีอากร ${customer.taxNumber}`} readOnly />
                            </>}
                        </div>
                    </div>
                </div>

                <div className="col-5">
                    <div className="row">
                        <div className="col">
                            <label className="form-label required">เลขที่</label>
                            <input
                                className="form-control form-control-sm"
                                value={props.receiptNumber}
                                name="receiptNumber"
                                onChange={(e) => props.onChangeModelValue(e.target.name, e.target.value)} />
                        </div>
                        <div className="col">
                            <label className="form-label required">วันที่</label>
                            <DatePicker
                                dateFormat={formatDate}
                                className="form-control form-control-sm"
                                value={props.receiptDate}
                                onChange={(date: Date) => props.onChangeModelValue("receiptDate", format(date, formatDate))}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label className="form-label required">กำหนดชำระเงิน</label>
                            <Select options={payments} onChange={(newVal) => props.onChangePayment(getPaymentById(newVal?.value))} />
                        </div>
                        <div className="col">
                            <label className="form-label required">วันครบกำหนด</label>
                            <DatePicker
                                dateFormat="dd-MM-yy"
                                className="form-control form-control-sm"
                                value={props.dueDate}
                                onChange={(date: Date) => props.onChangeModelValue("dueDate", format(date, formatDate))}
                            />
                        </div>
                    </div>
                </div>



            </div>


        </fieldset>
    </>;
}