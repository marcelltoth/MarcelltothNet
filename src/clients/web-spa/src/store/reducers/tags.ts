import { Reducer } from "redux";
import { TagsState } from "../state/tags";
import { FetchBasicDataSuccessAction } from "../actions/basic-data";
import { keyBy } from "lodash-es";

type KnownAction = FetchBasicDataSuccessAction;

const initialState : TagsState = [];

export const tagsReducer : Reducer<TagsState> = (state = initialState, incommingAction) => {
    const action = incommingAction as KnownAction;
    switch(action.type){
        case 'FETCH_BASIC_DATA_SUCCESS':
            return keyBy(action.data.tags, t => t.id);
    }
    return state;
}