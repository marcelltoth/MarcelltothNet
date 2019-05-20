import { StaticFileData } from "../../common/static-file";
import { AsyncAction } from "../../common";
import { apiClient } from "../../../services/api-client";

export interface FetchStaticFilesBeginAction{
    type: 'FETCH_STATIC_FILES_BEGIN';
}

export interface FetchStaticFilesSuccessAction{
    type: 'FETCH_STATIC_FILES_SUCCESS';
    files: StaticFileData[];
}

export interface FetchStaticFilesErrorAction{
    type: 'FETCH_STATIC_FILES_ERROR';
}

export type FetchStaticFilesActions = FetchStaticFilesBeginAction | FetchStaticFilesSuccessAction | FetchStaticFilesErrorAction;


export const fetchStaticFiles = () : AsyncAction<FetchStaticFilesActions> => (dispatch, getState) => {
    if(!getState().staticFiles.isRefreshing){
        dispatch(createBeginAction());
        apiClient.get<FilesResponse>('v1/static/files').then(response => {
            dispatch(createSuccessAction(response.data));
        })
        .catch(() => {
            dispatch(createErrorAction());
        })
    }
}

interface FileDto{
    id: string;
    mimeType: string;
    content: string;
    uploadDate: string;
    modifyDate: string;
    displayName: string;
}

type FilesResponse = FileDto[];

function createBeginAction() : FetchStaticFilesBeginAction{
    return {
        type: 'FETCH_STATIC_FILES_BEGIN'
    };
}

function createSuccessAction(files: StaticFileData[]) : FetchStaticFilesSuccessAction{
    return {
        type: 'FETCH_STATIC_FILES_SUCCESS',
        files
    }
}

function createErrorAction() : FetchStaticFilesErrorAction{
    return {
        type: 'FETCH_STATIC_FILES_ERROR'
    };
}