import { TagData } from "../common/tag";
import { Action, Reducer } from "redux";

export interface TagState{
    isRefreshing: boolean;
    tagList: TagData[];
}

const initialState: TagState = {
    isRefreshing: false,
    tagList: []
}

export const reducer : Reducer<TagState> = (state: TagState = initialState, incommingAction : Action) => {


    return state;
}