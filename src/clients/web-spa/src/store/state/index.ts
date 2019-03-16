import {ArticlesState} from './articles';
import {TagsState} from './tags';

export interface ApplicationState{
    articles: ArticlesState;
    tags: TagsState;
}