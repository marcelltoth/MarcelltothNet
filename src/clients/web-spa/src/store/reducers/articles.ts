import { Reducer } from "redux";
import { ArticlesState, ArticleData } from "../state/articles";
import { FetchBasicDataSuccessAction } from "../actions/basic-data";
import { keyBy } from "lodash-es";

type KnownAction = FetchBasicDataSuccessAction;

const initialState : ArticlesState = [];

export const articlesReducer : Reducer<ArticlesState> = (state = initialState, incommingAction) => {
    const action = incommingAction as KnownAction;
    switch(action.type){
        case 'FETCH_BASIC_DATA_SUCCESS':
            return mergeBasicData(state, action);
    }
    return state;
}

function mergeBasicData(state: ArticlesState, action: FetchBasicDataSuccessAction) : ArticlesState {
    // make sure not to lose already loaded content data
    const articlesById = keyBy(state, (a: ArticleData) => a.id);
    return action.data.articles.map(newArticle => {
        const oldArticle = articlesById[newArticle.id];
        if(!oldArticle)
            return ArticleData.fromDto(newArticle);
        return {
            ...oldArticle,
            ...newArticle
        };
    });
}