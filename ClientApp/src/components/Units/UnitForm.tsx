import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { UnitActions, UnitModel } from "../../store/UnitStore";
import { IconWithText } from "../../util/Icon";
import SimpleLabel from "../../util/SimpleLabel";

function getInitialForm(): UnitModel {
    return {
        id: null,
        name: ''
    }
}

function UnitForm() {
    const unitState = useSelector((appState: ApplicationState) => appState.unitState);
    const dispatch = useDispatch();
    const unitModel = unitState.selectedUnit || getInitialForm();

    const onChange = (e: React.FocusEvent<HTMLInputElement>) => {
        dispatch(
            UnitActions.selectUnit({
                ...unitModel,
                [e.target.name]: e.target.value
            })
        )
    }

    const invalidForm = !unitModel.name;

    return <>
        <form className="mb-3">
            <fieldset>
                <legend>{unitModel.id ? "แก้ไขหน่วย": "เพิ่มหน่วย"}</legend>
            </fieldset>

            <div className="row mb-3">
                <div className="col">
                    <SimpleLabel required title="ชื่อหน่วย (เช่น กิโลกรม กรัม)"  />
                    <input 
                        type="text"
                        name="name"
                        className="form-control form-control-sm"
                        value={unitModel.name ?? ''}
                        onChange={onChange}
                        required />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <button type="submit" className="btn btn-sm btn-success me-2" disabled={invalidForm}>
                        <IconWithText name="check-circle" label="บันทึก" />
                    </button>
                </div>
            </div>
        </form>
    </>
}

export default UnitForm;