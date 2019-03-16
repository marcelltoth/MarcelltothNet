
export interface ArticleDto{
    id: number;
    title: string;
    publishDate: string;
    thumbnailAltText: string;
    tagIds: number[];
    thumbnailLocaion?: string;
    content?: string;
}

interface ArticleData extends ArticleDto{
    isLoading: boolean;
}

export type ArticlesState = ReadonlyArray<ArticleData>;

export namespace ArticleData{
    function fromDto(dto: ArticleDto) : ArticleData{
        return {
            ...dto,
            isLoading: false
        };
    }
}