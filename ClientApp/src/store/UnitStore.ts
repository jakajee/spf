import { Reducer } from "redux";
import { BaseDropdown } from "../hooks/BaseModel";
import UnitAction, { UnitCombinedAction } from "./factory/UnitAction";

export interface UnitModel extends BaseDropdown { }

export interface UnitState {
    units: UnitModel[],
    selectedUnit: UnitModel | null,
    isLoading?: boolean
}

export const UnitActions = {
    getAllUnits: () => UnitAction.requestAll(),
    selectUnit: (unit: UnitModel) => UnitAction.selectedModel(unit),
    deleteUnit: (id: string | null) => UnitAction.deleteModel(id),
    createUnit: (unit: UnitModel) => UnitAction.createModel(unit),
    updateUnit: (unit: UnitModel) => UnitAction.updateModel(unit)
}

const defaultState: UnitState = {
    units: [],
    selectedUnit: null,
    isLoading: false
}

export const UnitReducers: Reducer<UnitState> = (state: UnitState = defaultState, action: UnitCombinedAction) => {
    switch (action.type) {
        case 'REQ_UNITS': return {
            ...defaultState,
            isLoading: true
        }
        case 'RES_UNITS': return {
            units: action.units,
            selectedUnit: null,
            isLoading: false
        }
        case 'SELECT_UNIT': return {
            ...state,
            selectedUnit: action.selectedUnit
        }
        default: return state;
    }
}
