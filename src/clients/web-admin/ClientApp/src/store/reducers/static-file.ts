import { StaticFileData } from "../common/static-file";
import { Reducer, Action } from "redux";
import { FetchStaticFilesActions } from "../actions/static-file";
import { UpdateFileSuccessAction, updateFile } from "../actions/static-file/update-file";
import { CreateFileSuccessAction } from "../actions/static-file/create-file";


export interface StaticFileState{
    isRefreshing: boolean;
    fileList: StaticFileData[];
}

const initialState : StaticFileState = {
    isRefreshing: false,
    fileList: []
};

type KnownAction = FetchStaticFilesActions | UpdateFileSuccessAction | CreateFileSuccessAction;

export const reducer : Reducer<StaticFileState> = (state = initialState, incommingAction: Action) => {
    
    const action = incommingAction as KnownAction;

    switch(action.type){
        case 'FETCH_STATIC_FILES_BEGIN':
            return {...state, isRefreshing: true};
        case 'FETCH_STATIC_FILES_SUCCESS':
            return {...state, fileList: action.files, isRefreshing: false};
        case 'FETCH_STATIC_FILES_ERROR':
            return {...state, isRefreshing: false};
        case 'UPDATE_FILE_SUCCESS':
            return updateFileInState(state, action.id, {mimeType: action.newMimeType, displayName: action.newDisplayName});
        case 'CREATE_FILE_SUCCESS':
            return {...state, fileList: [...state.fileList, action.data]};
    }

    return state;
}

function updateFileInState(state: StaticFileState, id: string, updater: Partial<StaticFileData>) : StaticFileState{
    return {
        ...state,
        fileList: state.fileList.map(f => {
            if(f.id !== id)
                return f;
            return {
                ...f,
                ...updater
            };
        })
    }
}