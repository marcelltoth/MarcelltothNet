import { ArticleData } from "../common/article";
import { Reducer, Action } from "redux";

export interface ArticleState{
    isRefreshing: boolean;
    articleList: ArticleData[];
}


const initialState : ArticleState = {
    isRefreshing: false,
    articleList: []
};


export const reducer : Reducer<ArticleState> = (state: ArticleState = initialState, incommingAction: Action) => {
    
    return state;
}