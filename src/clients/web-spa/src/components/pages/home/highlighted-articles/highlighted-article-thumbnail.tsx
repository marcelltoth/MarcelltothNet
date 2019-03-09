import * as React from 'react';
import { ArticleLink, ArticleMetaList } from '../../common';
import {format} from 'date-fns';
import style from './highlighted-article-thumbnail.module.scss';
import { TagBadge } from '../../common/tag-badge';
import { ArticleTitleNegative } from '../article-title';

interface TagData{
    title: string;
    id: number;
}

interface HighlightedArticleThumbnailProps{
    articleId: number;
    thumbnailImage: string;
    thumbnailAltText: string;
    title: string;
    author: string;
    publishDate: Date;
    tags: TagData[];
}

export const HighlightedArticleThumbnail : React.FC<HighlightedArticleThumbnailProps> 
= ({articleId, thumbnailImage, thumbnailAltText, title, author, publishDate, tags}) => {

    return <div className={style['highlighted-article-thumbnail']}>
        <ArticleLink id={articleId}>
            <img src={thumbnailImage} alt={thumbnailAltText} className={style['thumbnail-image']} />
        </ArticleLink>
        <div className={style.overlay}>
            <div className={style.tags}>
                {tags.map(t => <TagBadge key={t.id} tag={t} />)}
            </div>
            <ArticleTitleNegative title={title} articleId={articleId} />
            <ArticleMetaList className={style.meta}>
                <li className="primary">{author}</li>
                <li>{format(publishDate, 'MMMM D, YYYY')}</li>
            </ArticleMetaList>
        </div>
    </div>
}
