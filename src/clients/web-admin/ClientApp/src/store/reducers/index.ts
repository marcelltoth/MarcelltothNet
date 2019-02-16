import { combineReducers } from "redux";
import * as ArticleStore from "./article";
import * as TagStore from "./tag";


export interface ApplicationState{
    article: ArticleStore.ArticleState;
    tag: TagStore.TagState;
}

export const rootReducer = combineReducers({
    article: ArticleStore.reducer,
    tag: TagStore.reducer
});