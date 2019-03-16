import { combineReducers } from "redux";
import { articlesReducer } from "./articles";
import { tagsReducer } from "./tags";
import { uiReducer } from "./ui";


export const rootReducer = combineReducers({
    articles: articlesReducer,
    tags: tagsReducer,
    ui: uiReducer
});