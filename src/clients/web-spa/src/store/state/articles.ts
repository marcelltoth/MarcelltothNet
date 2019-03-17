
export interface ArticleDto{
    id: number;
    title: string;
    publishDate: string;
    thumbnailAltText: string;
    tagIds: number[];
    thumbnailLocaion?: string;
    content?: string;
}

export interface ArticleData extends ArticleDto{
    isLoading: boolean;
}

export type ArticlesState = ReadonlyArray<ArticleData>;

export class ArticleData{
    static fromDto(dto: ArticleDto) : ArticleData{
        return {
            ...dto,
            isLoading: false
        };
    }
}