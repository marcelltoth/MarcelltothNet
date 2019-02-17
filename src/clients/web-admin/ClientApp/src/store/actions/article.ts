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


export interface LoadSingleArticleBeginAction{
    type: 'LOAD_SINGLE_ARTICLE_BEGIN';
}

export interface LoadSingleArticleSuccessAction{
    type: 'LOAD_SINGLE_ARTICLE_SUCCESS';
    articleData: ArticleData;
}

export interface LoadSingleArticleErrorAction{
    type: 'LOAD_SINGLE_ARTICLE_ERROR';
}

export type LoadSingleArticleActions = LoadSingleArticleBeginAction | LoadSingleArticleSuccessAction | LoadSingleArticleErrorAction;

export interface SaveArticleBeginAction{
    type: 'SAVE_ARTICLE_BEGIN';
}

export interface SaveArticleSuccessAction{
    type: 'SAVE_ARTICLE_SUCCESS';
    articleData: ArticleData;
}

export interface SaveArticleErrorAction{
    type: 'SAVE_ARTICLE_ERROR';
}

export type SaveArticleActions = SaveArticleBeginAction | SaveArticleSuccessAction | SaveArticleErrorAction;


export interface ArticleChangeTitleAction{
    type: 'ARTICLE_CHANGE_TITLE';
    id: number;
    newTitle: string;
}

export interface ArticleChangePublishDateAction{
    type: 'ARTICLE_CHANGE_PUBLISH_DATE';
    id: number;
    newDate: Date;
}

export interface ArticleChangeThumbnailAction{
    type: 'ARTICLE_CHANGE_THUMBNAIL';
    id: number;
    newUri: string;
    newAltText: string;
}

export interface ArticleChangeContentAction{
    type: 'ARTICLE_CHANGE_CONTENT';
    id: number;
    newContent: string;
}

export type ArticleChangeActions = ArticleChangeTitleAction | ArticleChangePublishDateAction | ArticleChangeThumbnailAction | ArticleChangeContentAction;

export type ArticleActions = LoadArticlesActions | LoadSingleArticleActions | SaveArticleActions | ArticleChangeActions;


export const actionCreators = {
    loadArticles: () : AsyncAction<LoadArticlesActions> => async (dispatch, getState) => { 
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
    },
    loadSingleArticle: (id: number) : AsyncAction<LoadSingleArticleActions> => async (dispatch, getState) => { 
        if(!getState().article.isRefreshing){
            dispatch({type: 'LOAD_SINGLE_ARTICLE_BEGIN'});
            try{
                const response = await axios.get<ArticleData>(`https://localhost:13101/v1/article/articles/${id}`);
                dispatch({type: 'LOAD_SINGLE_ARTICLE_SUCCESS', articleData: response.data});
            }
            catch{
                dispatch({type: 'LOAD_SINGLE_ARTICLE_ERROR'});
            }
        }
    },
    saveArticle: (id: number) : AsyncAction<SaveArticleActions> => async (dispatch, getState) => { 
        const article = getState().article.articleList.find(a => a.id === id);
        if(!getState().article.isRefreshing && article !== undefined){
            dispatch({type: 'SAVE_ARTICLE_BEGIN'});
            try{
                const response = await axios.put<ArticleData>(`https://localhost:13101/v1/article/articles/${id}`, article);
                dispatch({type: 'SAVE_ARTICLE_SUCCESS', articleData: response.data});
            }
            catch{
                dispatch({type: 'SAVE_ARTICLE_ERROR'});
            }
        }
    },
    changeTitle: (id: number, newTitle: string) => ({
        type: 'ARTICLE_CHANGE_TITLE',
        id,
        newTitle
    }),
    changePublishDate: (id: number, newDate: Date) => ({
        type: 'ARTICLE_CHANGE_PUBLISH_DATE',
        id,
        newDate
    }),
    changeThumbnail: (id: number, newUri: string, newAltText: string) => ({
        type: 'ARTICLE_CHANGE_THUMBNAIL',
        id,
        newUri,
        newAltText
    }),
    changeContent: (id: number, newContent: string) => ({
        type: 'ARTICLE_CHANGE_CONTENT',
        id,
        newContent
    })
}