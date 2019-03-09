import * as React from 'react';

import style from './article-preview.module.scss';
import { ArticleLink, TagBadge } from '../../common';
import { ArticleTitle } from '../article-title';
import { ArticleMetaList } from '../article-meta-list';
import { format } from 'date-fns';

interface TagData{
    title: string;
    id: number;
}

interface ArticlePreviewPanelProps{
    articleId: number;
    thumbnailImage: string;
    thumbnailAltText: string;
    title: string;
    author: string;
    publishDate: Date;
    tags: TagData[];
}

export const ArticlePreviewPanel : React.FC<ArticlePreviewPanelProps> = ({articleId, thumbnailAltText, thumbnailImage, tags, title, publishDate, author}) => {
    return (
        <div className={style['article-preview-panel']}>
            <ArticleLink id={articleId} title={title}  className={style['img-link']}>
                <img src={thumbnailImage} alt={thumbnailAltText} />
            </ArticleLink>
            <div className={style.info}>
                <div className={style.tags}>
                    {tags.map(t => <TagBadge key={t.id} tag={t} />)}
                </div>
                <ArticleTitle title={title} articleId={articleId} />
                <ArticleMetaList>
                    <li className="primary">{author}</li>
                    <li>{format(publishDate, 'MMMM D, YYYY')}</li>
                </ArticleMetaList>
            </div>
        </div>
    );
}