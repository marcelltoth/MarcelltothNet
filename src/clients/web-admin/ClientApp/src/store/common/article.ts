
export interface ArticleData{
    id: number;
    title: string;
    publishDate: string;
    thumbnailLocation: string;
    thumbnailAltText: string;
    isPublished: boolean;
    tagIds: number[];
    content?: string;
}