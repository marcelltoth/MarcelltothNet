import { ArticleData } from "../common/article";
import { ActionCreatorsMapObject } from "redux";


export interface LoadArticlesBeginAction{
    type: 'LOAD_ARTICLES_BEGIN';
}

export interface LoadArticlesSuccessAction{
    type: 'LOAD_ARTICLES_BEGIN';
    articleList: ArticleData[];
}

export interface LoadArticlesErrorAction{
    type: 'LOAD_ARTICLES_ERROR';
}

export type LoadArticlesActions = LoadArticlesBeginAction | LoadArticlesSuccessAction | LoadArticlesErrorAction;

export type ArticleActions = LoadArticlesActions;

export const actionCreators : ActionCreatorsMapObject<ArticleActions> = {
    
}