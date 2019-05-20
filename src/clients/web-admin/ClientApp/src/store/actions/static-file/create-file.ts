import { StaticFileData } from "../../common/static-file";
import { func } from "prop-types";
import { AsyncAction } from "../../common";
import { apiClient } from "../../../services/api-client";

export interface CreateFileBeginAction{
    type: 'CREATE_FILE_BEGIN';
}

export interface CreateFileSuccessAction{
    type: 'CREATE_FILE_SUCCESS';
    data: StaticFileData;
}

export interface CreateFileErrorAction{
    type: 'CREATE_FILE_ERROR';
}

export type CreateFileActions = CreateFileBeginAction | CreateFileSuccessAction | CreateFileErrorAction;


export const createFile = (content: string, mimeType: string, displayName: string) : AsyncAction<CreateFileActions> => (dispatch, getState) => {
    dispatch(createBeginAction());
    apiClient.post<StaticFileData>('static/files', {
        content,
        mimeType,
        displayName
    }).then(response => dispatch(createSuccessAction(response.data)))
    .catch(() => dispatch(createErrorAction()));
}


function createBeginAction() : CreateFileBeginAction{
    return {
        type: 'CREATE_FILE_BEGIN'
    };
}

function createSuccessAction(data: StaticFileData) : CreateFileSuccessAction{
    return {
        type: 'CREATE_FILE_SUCCESS',
        data
    };
}

function createErrorAction() : CreateFileErrorAction{
    return {
        type: 'CREATE_FILE_ERROR'
    };
}