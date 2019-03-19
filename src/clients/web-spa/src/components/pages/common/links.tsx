import * as React from 'react';
import { Link } from 'react-router-dom';
import { createSlug } from 'speakingurl';

const seoUrlGenerator = createSlug({
    lang: "en"
});

type ArticleLinkProps = {
    id: number;
    title?: string;
    target?: string;
    className?: string;
}

export const ArticleLink : React.FC<ArticleLinkProps> = ({id, title, children, ...rest}) => 
    <Link to={generateArticleUrl(id, title || "")} {...rest}>{children}</Link>;

export function generateArticleUrl(id: number, title: string){
    return `/article/${id}/${seoUrlGenerator(title)}`;
}

interface TagLinkProps{
    id: number;
    title?: string;
    target?: string;
    className?: string;
}

export const TagLink : React.FC<TagLinkProps> = ({id, title, children, ...rest}) => {
    const slug = title !== undefined ? seoUrlGenerator(title) : "";
    return <Link to={`/tag/${id}/${slug}`} {...rest}>{children}</Link>;
}