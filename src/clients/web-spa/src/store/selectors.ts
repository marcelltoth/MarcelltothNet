
import { orderBy } from "lodash";
import { ApplicationState } from "./state";
import { Omit, Writable } from "ts-essentials";
import { ArticleData } from "./state/articles";
import { TagData } from "./state/tags";
import { map, mapValues, flow } from "lodash-es";
import memoize from 'memoize-state';


/* BASIC */

const selectArticles = (state: ApplicationState) => state.articles;
const selectTags = (state: ApplicationState) => state.tags;

export const selectBaiscDataLoading = (state: ApplicationState) => state.ui.basicDataLoading;
export const selectBaiscDataLoaded = (state: ApplicationState) => state.ui.basicDataLoaded;


/* ARTICLES */

export type ArticleDataDeep = 
    Omit<Writable<ArticleData>, 'tagIds'| 'publishDate'> 
    & {tags: TagData[], publishDate: Date};

const selectArticlesDeep = memoize((state: ApplicationState) => {
    const articles = selectArticles(state);
    const tags = selectTags(state);
    return articles.map(a => {
        return {
            ...a,
            publishDate: new Date(a.publishDate),
            tags: a.tagIds.map(tagId => tags[tagId]).filter(t => t !== undefined)
        };
    });
});

export const selectArticle = (state: ApplicationState, id: number) => selectArticlesDeep(state).find(a => a.id === id);

export const selectArticlesOrderedByAgeDesc = memoize((state: ApplicationState) => orderBy((selectArticlesDeep(state)), ['publishDate'], ['desc']))


/* TAGS */

export const selectTagsByArticleCountDesc = memoize((state: ApplicationState) => {
    const tags = selectTags(state);
    const articles = selectArticles(state);
    return orderBy(Object.values(tags).map(t => {
        const conformingArticles = articles.filter(a => a.tagIds.includes(t.id));
        return ({ ...t, articleCount: conformingArticles.length });
    }), ['articleCount', 'displayName'], ['desc', 'asc']);
});

export const selectArticlesByTag = (state: ApplicationState) => {
    const articlesOrdered = selectArticlesOrderedByAgeDesc(state);
    const tags = selectTags(state);
    return mapValues(tags, t => articlesOrdered.filter(a => a.tagIds.includes(t.id)));
}

export const selectTagById = selectTags;

