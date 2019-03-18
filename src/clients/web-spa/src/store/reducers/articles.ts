import { Reducer } from "redux";
import { ArticlesState, ArticleData } from "../state/articles";
import { FetchBasicDataSuccessAction, FetchThumbnailsSuccessAction } from "../actions/basic-data";
import { keyBy } from "lodash-es";
import { FetchArticleDetailsActions } from "../actions/articles";

type KnownAction = FetchBasicDataSuccessAction | FetchArticleDetailsActions | FetchThumbnailsSuccessAction;

const initialState : ArticlesState = [];

export const articlesReducer : Reducer<ArticlesState> = (state = initialState, incommingAction) => {
    const action = incommingAction as KnownAction;
    switch(action.type){
        case 'FETCH_BASIC_DATA_SUCCESS':
            return mergeBasicData(state, action);
        case 'FETCH_ARTICLE_DETAILS_BEGIN':
            return updateArticle(state, action.articleId, {isLoading: true});
        case 'FETCH_ARTICLE_DETAILS_SUCCESS':
            return updateArticle(state, action.articleId, {isLoading: false, ...action.data.article});
        case 'FETCH_ARTICLE_DETAILS_ERROR':
            return updateArticle(state, action.articleId, {isLoading: false});
        case 'FETCH_THUMBNAILS_SUCCESS':{
            return state.map(a => {
                const index = action.ids.indexOf(a.id);
                if(index === -1 || action.data[index] === null)
                    return a;
                return {...a, thumbnailLocation: action.data[index]}
            })
        }
    }
    return state;
}

function mergeBasicData(state: ArticlesState, action: FetchBasicDataSuccessAction) : ArticlesState {
    // make sure not to lose already loaded content data
    const articlesById = keyBy(state, (a: ArticleData) => a.id);
    return action.data.articles.map(newArticle => {
        const oldArticle = articlesById[newArticle.id];
        if(!oldArticle)
            return {
                ...newArticle,
                isLoading: false
            };
        return {
            ...oldArticle,
            ...newArticle
        };
    });
}

function updateArticle(state: ArticlesState, id: number, mutation: Partial<{[key in keyof ArticleData]: ArticleData[key];}>){
    return state.map(a => {
        if(a.id !== id)
            return a;
        else
            return {...a, ...mutation};
    })
}