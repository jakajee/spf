import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { UnitActions, UnitModel } from "../../store/UnitStore";
import { IconWithText } from "../../util/Icon";
import SimpleLabel from "../../util/SimpleLabel";

function getInitialForm(): UnitModel {
    return {
        id: -1,
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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (unitModel.id === -1) {
            dispatch(UnitActions.createUnit(unitModel));
        } else {
            dispatch(UnitActions.updateUnit(unitModel));
        }
    }

    const onReset = () => {
        dispatch(UnitActions.selectUnit(getInitialForm()));
    }

    const invalidForm = !unitModel.name;

    return <>
        <form className="mb-3" onSubmit={onSubmit} onReset={onReset}>
            <fieldset>
                <legend>{unitModel.id !== -1 ? "แก้ไขหน่วย": "เพิ่มหน่วย"}</legend>
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
                    <button type="reset" className="btn btn-sm btn-secondary">
                        <IconWithText name="arrow-counterclockwise" label="เคลียร์" />
                    </button>
                </div>
            </div>
        </form>
    </>
}

export default UnitForm;