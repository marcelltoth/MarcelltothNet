
import { orderBy } from "lodash";
import { ApplicationState } from "./state";
import { Omit, Writable } from "ts-essentials";
import { ArticleData } from "./state/articles";
import { TagData } from "./state/tags";
import { mapValues } from "lodash-es";
import memoizeOne from "memoize-one";


/* BASIC */

const selectArticles = (state: ApplicationState) => state.articles;
const selectTags = (state: ApplicationState) => state.tags;

export const selectBaiscDataLoading = (state: ApplicationState) => state.ui.basicDataLoading;
export const selectBaiscDataLoaded = (state: ApplicationState) => state.ui.basicDataLoaded;


/* ARTICLES */

export type ArticleDataDeep = 
    Omit<Writable<ArticleData>, 'tagIds'| 'publishDate'> 
    & {tags: TagData[], publishDate: Date};

const selectArticlesDeep = memoizeOne((state: ApplicationState) => {
    const articles = selectArticles(state);
    const tags = selectTags(state);
    return articles.map(a => {
        return {
            id: a.id,
            isLoading: a.isLoading,
            content: a.content,
            thumbnailLocation: a.thumbnailLocation,
            thumbnailAltText: a.thumbnailAltText,
            title: a.title,
            publishDate: new Date(a.publishDate),
            tagIds: a.tagIds,
            tags: a.tagIds.map(tagId => tags[tagId]).filter(t => t !== undefined)
        };
    });
});

export const selectArticle = (state: ApplicationState, id: number) => selectArticlesDeep(state).find(a => a.id === id);

export const selectArticlesOrderedByAgeDesc = memoizeOne((state: ApplicationState) => orderBy((selectArticlesDeep(state)), ['publishDate'], ['desc']))


/* TAGS */

export const selectTagsByArticleCountDesc = memoizeOne((state: ApplicationState) => {
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

