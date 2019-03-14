import * as React from 'react';
import style from './article-title.module.scss';
import { ArticleLink } from '../../common';
import classNames from 'classnames';

interface ArticleTitleProps{
    articleId: number;
    title: string;
    className?: string;
}


export const ArticleTitle : React.FC<ArticleTitleProps> = ({articleId, title, className}) => 
    <h3 className={classNames(style.title, className)}>
        <ArticleLink id={articleId} title={title}>{title}</ArticleLink>
    </h3>;

export const ArticleTitleNegative: React.FC<ArticleTitleProps> = (props) => 
    <ArticleTitle  {...props} className={classNames(style.negative, props.className)}/>;