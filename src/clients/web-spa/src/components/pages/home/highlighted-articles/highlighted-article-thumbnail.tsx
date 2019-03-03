import * as React from 'react';
import { ArticleLink, TagLink } from '../../../common/links';
import {format} from 'date-fns';
import style from './highlighted-article-thumbnail.module.scss';

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
                {tags.map(t => <TagBadge tag={t} />)}
            </div>
            <h3 className={style.title}>
                <ArticleLink id={articleId}>{title}</ArticleLink>
            </h3>
            <ul className={style.meta}>
                <li className={style.primary}>{author}</li>
                <li>{format(publishDate, 'MMMM D, YYYY')}</li>
            </ul>
        </div>
    </div>
}


interface TagBadgeProps{
    tag: TagData;
}

export const TagBadge : React.FC<TagBadgeProps> = ({tag: {title, id}}) => {
    return (
        <TagLink id={id} title={title} className="badge badge-danger">#{title}</TagLink>
    )
}