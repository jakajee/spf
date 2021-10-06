import { useProductList } from "../../hooks/MasterData";
import Icon from "../../util/Icon";

export default () => {
    const products = useProductList();

    return <>
        <fieldset>
            <legend>รายการสินค้า</legend>
            <form>
                <div className="row mb-2">
                    <div className="col-6">
                        <label className="form-label required">สินค้า</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                    <div className="col-2">
                        <label className="form-label required">จำนวน</label>
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control form-control-sm" />
                            <span className="input-group-text">ลัง</span>
                        </div>
                    </div>
                    <div className="col-2">
                        <label className="form-label required">ราคาต่อหน่วย</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                    <div className="col-2">
                        <label className="form-label required">จำนวนเงิน</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-success">
                            <Icon name="plus-circle" />
                            เพิ่ม
                        </button>
                    </div>
                </div>
            </form>
        </fieldset>
    </>;
}