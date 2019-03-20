import { TagData } from "../common/tag";
import { AsyncAction } from "../common";
import axios from 'axios';


export interface LoadTagsBeginAction{
    type: 'LOAD_TAGS_BEGIN';
}

export interface LoadTagsSuccessAction{
    type: 'LOAD_TAGS_SUCCESS';
    tagList: TagData[];
}

export interface LoadTagsErrorAction{
    type: 'LOAD_TAGS_ERROR';
}

export type LoadTagsActions = LoadTagsBeginAction | LoadTagsSuccessAction | LoadTagsErrorAction;

export type TagActions = LoadTagsActions;

export const actionCreators = {
    loadTags: () : AsyncAction<LoadTagsActions> => async (dispatch, getState) => { 
        if(!getState().tag.isRefreshing){
            dispatch({type: 'LOAD_TAGS_BEGIN'});
            try{
                const response = await axios.get<TagData[]>('https://localhost:13101/v1/article/tags');
                dispatch({type: 'LOAD_TAGS_SUCCESS', tagList: response.data});
            }
            catch{
                dispatch({type: 'LOAD_TAGS_ERROR'});
            }
        }
    } 
};