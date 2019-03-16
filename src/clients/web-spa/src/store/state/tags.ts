import {Dictionary} from 'ts-essentials';

interface TagData{
    id: number;
    displayName: string;
}

export type TagsState = Dictionary<TagData, number>;