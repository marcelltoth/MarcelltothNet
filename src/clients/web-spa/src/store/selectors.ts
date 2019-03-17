import { createSelector } from "reselect";
import { orderBy } from "lodash";
import { ApplicationState } from "./state";
import { Omit, Writable } from "ts-essentials";
import { ArticleData } from "./state/articles";
import { TagData } from "./state/tags";
import { map, mapValues } from "lodash-es";


/* BASIC */

const selectArticles = (state: ApplicationState) => state.articles;
const selectTags = (state: ApplicationState) => state.tags;

export const selectBaiscDataLoading = (state: ApplicationState) => state.ui.basicDataLoading;
export const selectBaiscDataLoaded = (state: ApplicationState) => state.ui.basicDataLoaded;


/* ARTICLES */

export type ArticleDataDeep = 
    Omit<Writable<ArticleData>, 'tagIds'| 'publishDate'> 
    & {tags: TagData[], publishDate: Date};

const selectArticlesDeep = createSelector(
    selectArticles,
    selectTags,
    (articles, tags) => articles.map(a => {
        return {
            ...a,
            publishDate: new Date(a.publishDate),
            tags: a.tagIds.map(tagId => tags[tagId]).filter(t => t !== undefined)
        };
    })
)

export const selectArticle = (state: ApplicationState, id: number) => selectArticlesDeep(state).find(a => a.id === id);

export const selectArticlesOrderedByAgeDesc = createSelector(
    selectArticlesDeep,
    a => orderBy(a, ['id'], ['desc'])
);


/* TAGS */

export const selectTagsByArticleCountDesc = createSelector(
    selectTags,
    selectArticles,
    (tags, articles) => orderBy(Object.values(tags).map(t => {
        const conformingArticles = articles.filter(a => a.tagIds.includes(t.id));
        return ({ ...t, articleCount: conformingArticles.length });
    }), ['articleCount', 'displayName'], ['desc', 'asc'])
);

export const selectArticlesByTag = createSelector(
    selectArticlesOrderedByAgeDesc,
    selectTags,
    (articles, tags) => mapValues(tags, t => articles.filter(a => a.tagIds.includes(t.id)))
);

export const selectTagById = selectTags;

