import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../store"
import { CustomerActions, CustomerModel } from "../../store/CustomerStore";
import Icon from "../../util/Icon";

function getInitialForm(): CustomerModel {
    return {
        id: null,
        fullName: '',
        address1: '',
        address2: '',
        taxNumber: ''
    };
}

export default () => {
    const customerState = useSelector((appState: ApplicationState) => appState.customerState);
    const dispatch = useDispatch();
    const customerModel = customerState.selectedCustomer || getInitialForm();

    const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch(
            CustomerActions.selectCustomer({
                ...customerModel,
                [e.target.name]: e.target.value
            })
        )
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!customerModel.id) {
            dispatch(
                CustomerActions.createCustomer(customerModel)
            );
        } else {
            dispatch(
                CustomerActions.updateCustomer(customerModel)
            );
        }
    }

    const onReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            CustomerActions.selectCustomer(getInitialForm())
        );
    }

    const invalidForm = !customerModel.fullName || !customerModel.address1 || !customerModel.address2 || !customerModel.taxNumber;

    return (
        <>
            <form onSubmit={onSubmit} onReset={onReset} className="mb-3">
                <fieldset>
                    <legend>{customerModel.id ? "แก้ไขข้อมูลลูกค้า" : "เพิ่มข้อมูลลูกค้า"}</legend>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label required">ชื่อลูกค้า</label>
                            <input
                                type="text"
                                name="fullName"
                                className="form-control form-control-sm"
                                value={customerModel.fullName}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label className="form-label required">ที่อยู่</label>
                            <input
                                type="text"
                                name="address1"
                                className="form-control form-control-sm mb-2"
                                value={customerModel.address1}
                                onChange={onInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="address2"
                                className="form-control form-control-sm"
                                value={customerModel.address2}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label className="form-label required">เลขประจำตัวผู้เสียภาษีอากร</label>
                            <input
                                type="text"
                                name="taxNumber"
                                className="form-control form-control-sm"
                                value={customerModel.taxNumber}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-success me-2" disabled={invalidForm}>
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
    );
}