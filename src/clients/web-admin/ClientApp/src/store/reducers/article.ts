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

        case 'LOAD_SINGLE_ARTICLE_BEGIN':
            return {...state, isRefreshing: true};
        case 'LOAD_SINGLE_ARTICLE_SUCCESS':
            return {...state, 
                articleList: [...state.articleList.filter(a => a.id !== action.articleData.id), action.articleData],
                isRefreshing: false
            };
        case 'LOAD_SINGLE_ARTICLE_ERROR':
            return {...state, isRefreshing: false};

        case 'CREATE_ARTICLE_BEGIN':
            return {...state, isRefreshing: true};
        case 'CREATE_ARTICLE_SUCCESS':
            return {...state, articleList: [...state.articleList, action.articleData], isRefreshing: false};
        case 'CREATE_ARTICLE_ERROR':
            return {...state, isRefreshing: false};

        case 'SAVE_ARTICLE_BEGIN':
            return {...state, isRefreshing: true};
        case 'SAVE_ARTICLE_SUCCESS':
            return {...state, 
                articleList: [...state.articleList.filter(a => a.id !== action.articleData.id), action.articleData],
                isRefreshing: false
            };
        case 'SAVE_ARTICLE_ERROR':
            return {...state, isRefreshing: false};

        case 'ARTICLE_CHANGE_TITLE':
            return updateArticle(state, action.id, {title: action.newTitle});
        case 'ARTICLE_CHANGE_PUBLISH_DATE':
            return updateArticle(state, action.id, {publishDate: action.newDate.toISOString()});
        case 'ARTICLE_CHANGE_THUMBNAIL':
            return updateArticle(state, action.id, {thumbnailLocation: action.newUri, thumbnailAltText: action.newAltText});
        case 'ARTICLE_CHANGE_CONTENT':
            return updateArticle(state, action.id, {content: action.newContent});

        case 'ARCHIVE_ARTICLE_BEGIN':
            return {...state, isRefreshing: true};
        case 'ARCHIVE_ARTICLE_SUCCESS':
            return archiveArticle(state, action.id);
        case 'ARCHIVE_ARTICLE_ERROR':
            return {...state, isRefreshing: false};
            
        case 'PUBLISH_ARTICLE_BEGIN':
            return {...state, isRefreshing: true};
        case 'PUBLISH_ARTICLE_SUCCESS':
            return publishArticle(state, action.id);
        case 'PUBLISH_ARTICLE_ERROR':
            return {...state, isRefreshing: false};
    }

    return state;
}

type ArticleChangeSet = {
    [prop in keyof ArticleData]?: ArticleData[prop];
}


function archiveArticle(state: ArticleState, id: number) : ArticleState{
    return {
        ..._changeArticlePublishState(state, id, false),
        isRefreshing: false
    };
}
function publishArticle(state: ArticleState, id: number) : ArticleState{
    return {
        ..._changeArticlePublishState(state, id, true),
        isRefreshing: false
    };
}

function _changeArticlePublishState(state: ArticleState, id: number, publishState: boolean) : ArticleState{
    return {
        ...state,
        articleList: state.articleList.map(a => {
            if(a.id !== id)
                return a;
            else
                return {...a, isPublished: publishState};
        })
    }
}



function updateArticle(state: ArticleState, id: number, changeSet: ArticleChangeSet) : ArticleState{
    return {
        ...state,
        articleList: state.articleList.map(a => {
            if(a.id !== id)
                return a;
            else
                return {...a, ...changeSet, isDirty: true};
        })
    }
}