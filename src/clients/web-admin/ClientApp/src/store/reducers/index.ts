import { combineReducers } from "redux";
import * as ArticleStore from "./article";
import * as TagStore from "./tag";
import * as StaticFileStore from "./static-file";


export interface ApplicationState{
    article: ArticleStore.ArticleState;
    tag: TagStore.TagState;
    staticFile: StaticFileStore.StaticFileState;
}

export const rootReducer = combineReducers({
    article: ArticleStore.reducer,
    tag: TagStore.reducer,
    staticFile: StaticFileStore.reducer
});