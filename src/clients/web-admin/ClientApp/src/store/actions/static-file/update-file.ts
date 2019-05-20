import { AsyncAction } from "../../common";
import { apiClient } from "../../../services/api-client";

export interface UpdateFileBeginAction{
    type: 'UPDATE_FILE_BEGIN';
    id: string;
}

export interface UpdateFileSuccessAction{
    type: 'UPDATE_FILE_SUCCESS';
    id: string;
    newDisplayName: string;
    newMimeType: string;
}

export interface UpdateFileErrorAction{
    type: 'UPDATE_FILE_ERROR';
    id: string;
}

export type UpdateFileActions = UpdateFileBeginAction | UpdateFileSuccessAction | UpdateFileErrorAction;

export const updateFile = (id: string, displayName: string, mimeType: string, content?: string) : AsyncAction<UpdateFileActions> => (dispatch, getState) => {
    dispatch(createBeginAction(id));
    apiClient.put(`static/files/${id}`, {
        mimeType,
        content,
        displayName
    }).then(() => {
        dispatch(createSuccessAction(id, displayName, mimeType));
    }).catch(() => {
        dispatch(createErrorAction(id));
    });
}


function createBeginAction(id: string) : UpdateFileBeginAction{
    return {
        type: 'UPDATE_FILE_BEGIN',
        id
    };
}

function createSuccessAction(id: string, newDisplayName: string, newMimeType: string) : UpdateFileSuccessAction{
    return {
        type: 'UPDATE_FILE_SUCCESS',
        id,
        newDisplayName,
        newMimeType
    }
}

function createErrorAction(id: string) : UpdateFileErrorAction{
    return {
        type: 'UPDATE_FILE_ERROR',
        id
    };
}