import { Reducer } from "redux";
import { UiState } from "../state/ui";
import { FetchBasicDataActions } from "../actions/basic-data";

type KnownAction = FetchBasicDataActions;

const initialState : UiState = {
    basicDataLoaded: false,
    basicDataLoading: false
};

export const uiReducer : Reducer<UiState> = (state = initialState, incommingAction) : UiState => {
    const action = incommingAction as KnownAction;
    switch(action.type){
        case 'FETCH_BASIC_DATA_BEGIN':
            return {
                ...state,
                basicDataLoading: true
            }
        case 'FETCH_BASIC_DATA_SUCCESS':
            return {
                ...state,
                basicDataLoading: false,
                basicDataLoaded: true
            }
        case 'FETCH_BASIC_DATA_ERROR':
            return {
                ...state,
                basicDataLoading: false,
            }
    }
    return state;
}