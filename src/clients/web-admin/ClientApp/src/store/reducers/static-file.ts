import { StaticFileData } from "../common/static-file";
import { Reducer, Action } from "redux";
import { FetchStaticFilesActions } from "../actions/static-file";


export interface StaticFileState{
    isRefreshing: boolean;
    fileList: StaticFileData[];
}

const initialState : StaticFileState = {
    isRefreshing: false,
    fileList: []
};

type KnownAction = FetchStaticFilesActions;

export const reducer : Reducer<StaticFileState> = (state = initialState, incommingAction: Action) => {
    
    const action = incommingAction as KnownAction;

    switch(action.type){
        case 'FETCH_STATIC_FILES_BEGIN':
            return {...state, isRefreshing: true};
        case 'FETCH_STATIC_FILES_SUCCESS':
            return {...state, fileList: action.files, isRefreshing: false};
        case 'FETCH_STATIC_FILES_ERROR':
            return {...state, isRefreshing: false};
    }


    return state;
}