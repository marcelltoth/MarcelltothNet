import { ArticleData } from "../common/article";
import { ActionCreatorMap, AsyncAction } from "../common";
import axios from 'axios';


export interface LoadArticlesBeginAction{
    type: 'LOAD_ARTICLES_BEGIN';
}

export interface LoadArticlesSuccessAction{
    type: 'LOAD_ARTICLES_SUCCESS';
    articleList: ArticleData[];
}

export interface LoadArticlesErrorAction{
    type: 'LOAD_ARTICLES_ERROR';
}

export type LoadArticlesActions = LoadArticlesBeginAction | LoadArticlesSuccessAction | LoadArticlesErrorAction;

export type ArticleActions = LoadArticlesActions;

export const actionCreators : ActionCreatorMap<ArticleActions> = {
    loadArticles: () : AsyncAction<ArticleActions> => async (dispatch, getState) => { 
        if(!getState().article.isRefreshing){
            dispatch({type: 'LOAD_ARTICLES_BEGIN'});
            try{
                const response = await axios.get<ArticleData[]>('https://localhost:13101/v1/article/articles');
                dispatch({type: 'LOAD_ARTICLES_SUCCESS', articleList: response.data});
            }
            catch{
                dispatch({type: 'LOAD_ARTICLES_ERROR'});
            }
        }
    }
}