import {ArticlesState} from './articles';
import {TagsState} from './tags';
import { UiState } from './ui';
import { DeepReadonly } from 'ts-essentials';

export type ApplicationState = DeepReadonly<{
    articles: ArticlesState;
    tags: TagsState;
    ui: UiState;
}>;