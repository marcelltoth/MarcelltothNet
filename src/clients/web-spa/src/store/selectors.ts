import { createSelector } from "reselect";
import { orderBy } from "lodash";
import { ApplicationState } from "./state";
import { Omit, Writable } from "ts-essentials";
import { ArticleData } from "./state/articles";
import { TagData } from "./state/tags";

export type ArticleDataDeep = 
    Omit<Writable<ArticleData>, 'tagIds'| 'publishDate'> 
    & {tags: TagData[], publishDate: Date};

const selectArticles = (state: ApplicationState) => state.articles;
const selectTags = (state: ApplicationState) => state.tags;

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

export const selectArticlesOrderedByAgeDesc = createSelector(
    selectArticlesDeep,
    a => orderBy(a, ['id'], ['desc'])
);

export const selectTagsByArticleCountDesc = createSelector(
    selectTags,
    selectArticles,
    (tags, articles) => orderBy(Object.values(tags).map(t => {
        const conformingArticles = articles.filter(a => a.tagIds.includes(t.id));
        return ({ ...t, articleCount: conformingArticles.length });
    }), ['articleCount', 'displayName'], ['desc', 'asc'])
);