import { ArticleData } from "../common/article";
import { Reducer, Action } from "redux";
import { ArticleActions } from "../actions/article";

export interface ArticleState{
    isRefreshing: boolean;
    articleList: ArticleData[];
}


const initialState : ArticleState = {
    isRefreshing: false,
    articleList: []
};

type KnownActions = ArticleActions;

export const reducer : Reducer<ArticleState> = (state: ArticleState = initialState, incommingAction: Action) => {
    
    const action = incommingAction as KnownActions;

    switch(action.type){
        case 'LOAD_ARTICLES_BEGIN':
            return {...state, isRefreshing: true};
        case 'LOAD_ARTICLES_SUCCESS':
            return {...state, articleList: action.articleList, isRefreshing: false};
        case 'LOAD_ARTICLES_ERROR':
            return {...state, isRefreshing: false};
    }

    return state;
}