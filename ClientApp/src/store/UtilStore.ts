import { Reducer } from "redux"

type Serverity = "success" | "warning" | "error" | "info" | null

export interface LoadingState {
    isLoading: boolean | null,
    message: string | null,
    severity: Serverity
}

export interface LoadingAction {
    type: 'LOADING'
}

export interface LoadedAction {
    type: 'LOADED',
    message: string | null,
    serverity: Serverity
}

type KnownAction = LoadingAction | LoadedAction

export const UtilActions = {
    loading: (): KnownAction => ({ type: 'LOADING' }),
    loaded: (message: string | null, serverity: Serverity = "info"): KnownAction => ({ type: 'LOADED', message, serverity })
}

const defaultState: LoadingState = {
    isLoading: null,
    message: null,
    severity: null
}

export const UtilReducers: Reducer<LoadingState> = (state: LoadingState = defaultState, action: KnownAction) => {
    switch (action.type) {
        case 'LOADED': return {
            isLoading: false,
            message: action.message,
            severity: action.serverity
        }
        case 'LOADING': return {
            isLoading: true,
            message: 'กำลังทำงาน...',            
            severity: 'info'
        }
        default: return state;
    }
}