import { Reducer, Action } from "redux";
import { ArticlesState } from "../state/articles";

type KnownAction = Action<never>;

const initialState : ArticlesState = [];

export const articlesReducer : Reducer<ArticlesState> = (state = initialState, incommingAction) => {
    const action = incommingAction as KnownAction;
    switch(action.type){

    }
    return state;
}