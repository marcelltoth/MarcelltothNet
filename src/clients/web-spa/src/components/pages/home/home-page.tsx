import * as React from 'react';
import { HighlightedArticlePanel } from './highlighted-article-panel';
import { HighlightedArticleThumbnail } from './highlighted-article-thumbnail';

export const HomePage : React.FC = () => {
    return (
        <HighlightedArticlePanel>
            <HighlightedArticleThumbnail 
                articleId={0}
                thumbnailImage="https://via.placeholder.com/1200x800"
                thumbnailAltText="Placeholder Image"
                title="Some random article which is the first preview"
                author="Marcell Toth"
                publishDate={new Date()}
                tags={[{title: "csharp", id: 3}]}
                />
            <HighlightedArticleThumbnail 
                articleId={0}
                thumbnailImage="https://via.placeholder.com/1200x800"
                thumbnailAltText="Placeholder Image"
                title="Some random article which is the second preview"
                author="Marcell Toth"
                publishDate={new Date()}
                tags={[{title: "csharp", id: 3}]}
                />
            <HighlightedArticleThumbnail 
                articleId={0}
                thumbnailImage="https://via.placeholder.com/1200x800"
                thumbnailAltText="Placeholder Image"
                title="Some random article which is the third preview"
                author="Marcell Toth"
                publishDate={new Date()}
                tags={[{title: "csharp", id: 3}]}
                />
        </HighlightedArticlePanel>
    );
}