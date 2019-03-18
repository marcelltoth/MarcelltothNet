

export interface ArticleData{
    id: number;
    title: string;
    publishDate: string;
    thumbnailAltText: string;
    tagIds: number[];
    thumbnailLocation?: string;
    content?: string;
    isLoading: boolean;
}

export type ArticlesState = ReadonlyArray<ArticleData>;