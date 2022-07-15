import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { UnitModel } from "../../store/UnitStore";

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

    return <>
        <form>
            <fieldset>
                <legend>{unitModel.id ? "แก้ไขหน่วย": "เพิ่มหน่วย"}</legend>
            </fieldset>
        </form>
    </>
}

export default UnitForm;