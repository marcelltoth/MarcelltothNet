import { Reducer, Action } from "redux";
import { TagsState } from "../state/tags";

type KnownAction = Action<never>;

const initialState : TagsState = [];

export const tagsReducer : Reducer<TagsState> = (state = initialState, incommingAction) => {
    const action = incommingAction as KnownAction;
    switch(action.type){
        
    }
    return state;
}