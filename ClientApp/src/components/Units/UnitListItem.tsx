import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { UnitActions, UnitModel } from "../../store/UnitStore";
import { IconWithText } from "../../util/Icon";

function UnitListItem(props: UnitModel & { idx: number }) {
    const dispatch = useDispatch();
    const selectedUnitId = useSelector((appState: ApplicationState) => appState.unitState.selectedUnit?.id);
    
    const {
        idx,
        name,
        id
    } = props;

    const selected = id === selectedUnitId ? "table-dark" : "";

    const onSelectUnit = () => {
        dispatch(UnitActions.selectUnit(props));
    } 

    const onRemoveUnit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (confirm("ลบหน่วยนี้ใช่หรือไม่")) {
            dispatch(UnitActions.deleteUnit(id))
        }
    }

    return <>
        <tr className={`pointer ${selected}`} onClick={onSelectUnit}>
            <td className="text-center">{idx + 1}</td>
            <td>{name}</td>
            <td className="text-center">
                <button className="btn btn-sm btn-danger" onClick={onRemoveUnit}>
                    <IconWithText name="x-circle" label="ลบ" />
                </button>
            </td>
        </tr>
    </>
}

export default UnitListItem;