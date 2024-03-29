import { AxiosResponse } from "axios";
import { AppThunkAction } from "..";
import api, { BaseResponse } from "../../api";
import { LoadedAction, LoadingAction } from "../UtilStore";

type ID = string | number | null;

abstract class BaseStore<KnownAction, TModel> {

    constructor(protected baseUrl: string) {

    }

    protected abstract entityName: string;

    protected abstract getRequestAllAction(): KnownAction;
    protected abstract getResponseAllAction(response: AxiosResponse<any>): KnownAction;
    protected abstract getSelectModelAction(model: TModel): KnownAction;

    public requestAll(): AppThunkAction<KnownAction> {
        return async (dispatch) => {
            dispatch(this.getRequestAllAction());
            try {
                const response = await api.get(`${this.baseUrl}/getall`);
                dispatch(this.getResponseAllAction(response));
            } catch (error) {
                dispatch(this.getRequestAllAction());
            }
        }
    }

    public selectedModel(selectedModel: TModel) {
        return this.getSelectModelAction(selectedModel);
    }    

    public deleteModel(id: ID): AppThunkAction<KnownAction | LoadedAction | LoadingAction> {
        return async (dispatch, getState) => {
            dispatch({ type: 'LOADING' })
            const response = await api.post<BaseResponse>(`${this.baseUrl}/delete?id=${id}`);
            dispatch({ type: 'LOADED', message: response.data.message, serverity: 'success' })

            if (response.data.isSuccess) {
                this.requestAll()(dispatch, getState);
            }
        }
    }

    public createModel(model: TModel) {
        return this.postRequest(model, "create", this.getCreateFailMessage());
    }

    public updateModel(model: TModel) {
        return this.postRequest(model, "update", this.getUpdateFailMessage());
    }
    
    private postRequest(model: TModel, action: string, failTitle: string): AppThunkAction<KnownAction | LoadedAction | LoadingAction> {
        return async (dispatch, getState) => {
            dispatch({ type: 'LOADING' })
            const response = await api.post<BaseResponse>(`${this.baseUrl}/${action}`, model);

            if (response.data.isSuccess) {
                dispatch({ type: 'LOADED', message: response.data.message, serverity: 'success' });
                this.requestAll()(dispatch, getState);
            } else {
                dispatch({ type: 'LOADED', message: `${failTitle}: ${response.data.message}`, serverity: 'warning' });
            }
        }
    }

    private getCreateFailMessage() {
        return `เพิ่มข้อมูล${this.entityName}ล้มเหลว`;
    }

    private getUpdateFailMessage() {
        return `แก้ไขข้อมูล${this.entityName}ล้มเหลว`;
    }
}

export default BaseStore;
