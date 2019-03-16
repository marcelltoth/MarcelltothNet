import {Dictionary} from 'ts-essentials';

export type TagDto = TagData;

interface TagData{
    id: number;
    displayName: string;
}

export type TagsState = Dictionary<TagData, number>;