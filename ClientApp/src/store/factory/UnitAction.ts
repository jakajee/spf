import { AxiosResponse } from "axios";
import { UnitModel } from "../UnitStore"
import BaseAction from "./BaseAction";

export interface RequestUnitActions {
    type: 'REQ_UNITS'
}

export interface ResponseUnitAction {
    type: 'RES_UNITS',
    units: UnitModel[]
}

export interface SelectUnitAction {
    type: 'SELECT_UNIT',
    selectedUnit: UnitModel
}

export type UnitCombinedAction = RequestUnitActions | ResponseUnitAction | SelectUnitAction;

class UnitAction extends BaseAction<UnitCombinedAction, UnitModel> {
    protected entityName: string = "หน่วยนับ";
    protected getRequestAllAction(): UnitCombinedAction {
        return {
            type: 'REQ_UNITS'
        }
    }
    protected getResponseAllAction(response: AxiosResponse<any>): UnitCombinedAction {
        return {
            type: 'RES_UNITS',
            units: response.data
        }
    }
    protected getSelectModelAction(model: UnitModel): UnitCombinedAction {
        return {
            type: 'SELECT_UNIT',
            selectedUnit: model
        }
    }
}

export default new UnitAction('/units')