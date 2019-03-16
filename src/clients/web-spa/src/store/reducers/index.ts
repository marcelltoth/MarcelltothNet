import { combineReducers } from "redux";
import { articlesReducer } from "./articles";
import { tagsReducer } from "./tags";


export const rootReducer = combineReducers({
    articles: articlesReducer,
    tags: tagsReducer
});