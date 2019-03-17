import { Reducer } from "redux";
import { TagsState } from "../state/tags";
import { FetchBasicDataSuccessAction } from "../actions/basic-data";

type KnownAction = FetchBasicDataSuccessAction;

const initialState : TagsState = [];

export const tagsReducer : Reducer<TagsState> = (state = initialState, incommingAction) => {
    const action = incommingAction as KnownAction;
    switch(action.type){
        case 'FETCH_BASIC_DATA_SUCCESS':
            return action.data.tags;
    }
    return state;
}