import { TagData } from "../common/tag";
import { ActionCreatorsMapObject } from "redux";


export interface LoadTagsBeginAction{
    type: 'LOAD_TAGS_BEGIN';
}

export interface LoadTagsSuccessAction{
    type: 'LOAD_TAGS_BEGIN';
    tagList: TagData[];
}

export interface LoadTagsErrorAction{
    type: 'LOAD_TAGS_ERROR';
}

export type LoadTagsActions = LoadTagsBeginAction | LoadTagsSuccessAction | LoadTagsErrorAction;

export type TagActions = LoadTagsActions;

export const actionCreators : ActionCreatorsMapObject<TagActions> = {
    
}