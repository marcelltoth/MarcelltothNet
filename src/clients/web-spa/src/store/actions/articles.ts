import { ArticleDto } from "../state/articles";
import { ThunkAction, apiClient } from "./common";
import { selectArticle } from "../selectors";

export interface ArticlePageResult{
    article: ArticleDto;
}

export interface FetchArticleDetailsBeginAction{
    type: 'FETCH_ARTICLE_DETAILS_BEGIN';
    articleId: number;
}

export interface FetchArticleDetailsSuccessAction{
    type: 'FETCH_ARTICLE_DETAILS_SUCCESS';
    articleId: number;
    data: ArticlePageResult;
}

export interface FetchArticleDetailsErrorAction{
    type: 'FETCH_ARTICLE_DETAILS_ERROR';
    articleId: number;
}

export type FetchArticleDetailsActions = FetchArticleDetailsBeginAction | FetchArticleDetailsSuccessAction | FetchArticleDetailsErrorAction;


export const fetchArticleDetails = (articleId: number) : ThunkAction => (dispatch, getState) => {
    const article = selectArticle(getState(), articleId);
    if(article !== undefined && !article.isLoading){
        dispatch(createBeginAction(articleId));
        apiClient.get<ArticlePageResult>(`v1/article-page/${encodeURIComponent(articleId.toString())}`)
            .then(response => {
                dispatch(createSuccessAction(articleId, response.data));
            })
            .catch(() => {
                dispatch(createErrorAction(articleId));
            });
    }
}



function createBeginAction(articleId: number) : FetchArticleDetailsBeginAction{
    return {
        type: 'FETCH_ARTICLE_DETAILS_BEGIN',
        articleId
    };
}
function createSuccessAction(articleId: number, data: ArticlePageResult) : FetchArticleDetailsSuccessAction{
    return {
        type: 'FETCH_ARTICLE_DETAILS_SUCCESS',
        articleId,
        data
    };
}
function createErrorAction(articleId: number) : FetchArticleDetailsErrorAction{
    return {
        type: 'FETCH_ARTICLE_DETAILS_ERROR',
        articleId
    };
}