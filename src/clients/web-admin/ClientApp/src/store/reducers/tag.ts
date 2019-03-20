import { TagData } from "../common/tag";
import { Action, Reducer } from "redux";
import { LoadTagsActions } from "../actions/tag";

export interface TagState{
    isRefreshing: boolean;
    tagList: TagData[];
}

const initialState: TagState = {
    isRefreshing: false,
    tagList: []
}

type KnownAction = LoadTagsActions;

export const reducer : Reducer<TagState> = (state: TagState = initialState, incommingAction : Action) => {

    const action = incommingAction as KnownAction;

    switch(action.type){
        case 'LOAD_TAGS_BEGIN':
            return {...state, isRefreshing: true};
        case 'LOAD_TAGS_SUCCESS':
            return {...state, tagList: action.tagList, isRefreshing: false};
        case 'LOAD_TAGS_ERROR':
            return {...state, isRefreshing: false};
    }

    return state;
}