import { ArticleData } from "../common/article";
import { ActionCreatorMap, AsyncAction } from "../common";
import {apiClient} from '../../services/api-client';


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


export interface CreateArticleBeginAction{
    type: 'CREATE_ARTICLE_BEGIN';
}

export interface CreateArticleSuccessAction{
    type: 'CREATE_ARTICLE_SUCCESS';
    articleData: ArticleData;
}

export interface CreateArticleErrorAction{
    type: 'CREATE_ARTICLE_ERROR';
}

export type CreateArticleActions = CreateArticleBeginAction | CreateArticleSuccessAction | CreateArticleErrorAction;


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

export interface ArticleChangeTagsAction{
    type: 'ARTICLE_CHANGE_TAGS';
    id: number;
    newTags: number[];
}

export type ArticleChangeActions = ArticleChangeTitleAction | ArticleChangePublishDateAction | ArticleChangeThumbnailAction | ArticleChangeContentAction | ArticleChangeTagsAction;


export interface ArchiveArticleBeginAction{
    type: 'ARCHIVE_ARTICLE_BEGIN';
}

export interface ArchiveArticleSuccessAction{
    type: 'ARCHIVE_ARTICLE_SUCCESS';
    id: number;
}

export interface ArchiveArticleErrorAction{
    type: 'ARCHIVE_ARTICLE_ERROR';
}

export type ArchiveArticleActions = ArchiveArticleBeginAction | ArchiveArticleSuccessAction | ArchiveArticleErrorAction;


export interface PublishArticleBeginAction{
    type: 'PUBLISH_ARTICLE_BEGIN';
}

export interface PublishArticleSuccessAction{
    type: 'PUBLISH_ARTICLE_SUCCESS';
    id: number;
}

export interface PublishArticleErrorAction{
    type: 'PUBLISH_ARTICLE_ERROR';
}

export type PublishArticleActions = PublishArticleBeginAction | PublishArticleSuccessAction | PublishArticleErrorAction;


export type ArticleActions = LoadArticlesActions | LoadSingleArticleActions |CreateArticleActions
    | SaveArticleActions | ArticleChangeActions | ArchiveArticleActions | PublishArticleActions;


export const actionCreators = {
    loadArticles: () : AsyncAction<LoadArticlesActions> => async (dispatch, getState) => { 
        if(!getState().article.isRefreshing){
            dispatch({type: 'LOAD_ARTICLES_BEGIN'});
            try{
                const response = await apiClient.get<ArticleData[]>('article/articles');
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
                const response = await apiClient.get<ArticleData>(`article/articles/${id}`);
                dispatch({type: 'LOAD_SINGLE_ARTICLE_SUCCESS', articleData: response.data});
            }
            catch{
                dispatch({type: 'LOAD_SINGLE_ARTICLE_ERROR'});
            }
        }
    },
    createEmptyArticle: () : AsyncAction<CreateArticleActions> => async (dispatch, getState) => { 
        if(!getState().article.isRefreshing){
            dispatch({type: 'CREATE_ARTICLE_BEGIN'});
            try{

                const newArticle : ArticleData = {
                    id: 0,
                    title: "Draft article",
                    thumbnailLocation: "",
                    thumbnailAltText: "",
                    tagIds: [],
                    content: "Draft article content",
                    publishDate: new Date().toISOString(),
                    isPublished: false
                };

                const response = await apiClient.post<ArticleData>(`article/articles`, newArticle);
                dispatch({type: 'CREATE_ARTICLE_SUCCESS', articleData: response.data});
            }
            catch{
                dispatch({type: 'CREATE_ARTICLE_ERROR'});
            }
        }
    },
    saveArticle: (id: number) : AsyncAction<SaveArticleActions> => async (dispatch, getState) => { 
        const article = getState().article.articleList.find(a => a.id === id);
        if(!getState().article.isRefreshing && article !== undefined){
            dispatch({type: 'SAVE_ARTICLE_BEGIN'});
            try{
                const response = await apiClient.put<ArticleData>(`article/articles/${id}`, article);
                dispatch({type: 'SAVE_ARTICLE_SUCCESS', articleData: response.data});
            }
            catch{
                dispatch({type: 'SAVE_ARTICLE_ERROR'});
            }
        }
    },
    archiveArticle: (id: number) : AsyncAction<ArchiveArticleActions> => async (dispatch, getState) => { 
        if(!getState().article.isRefreshing){
            dispatch({type: 'ARCHIVE_ARTICLE_BEGIN'});
            try{
                await apiClient.patch(`article/articles/${id}/archive`);
                dispatch({type: 'ARCHIVE_ARTICLE_SUCCESS', id});
            }
            catch{
                dispatch({type: 'ARCHIVE_ARTICLE_ERROR'});
            }
        }
    },
    publishArticle: (id: number) : AsyncAction<PublishArticleActions> => async (dispatch, getState) => { 
        if(!getState().article.isRefreshing){
            dispatch({type: 'PUBLISH_ARTICLE_BEGIN'});
            try{
                await apiClient.patch(`article/articles/${id}/publish`);
                dispatch({type: 'PUBLISH_ARTICLE_SUCCESS', id});
            }
            catch{
                dispatch({type: 'PUBLISH_ARTICLE_ERROR'});
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
    }),
    changeTags: (id: number, newTagIds: number[]) => ({
        type: 'ARTICLE_CHANGE_TAGS',
        id,
        newTags: newTagIds
    })
}