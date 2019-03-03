import * as React from 'react';
import styles from './tag-list.module.scss';
import { TagLink } from '../../../common';

interface TagData{
    id: number;
    title: string;
    articleCount: number;
}

export const TagList : React.FC = ({children}) => 
    <ul className={styles['tag-list']}>
        {children}
    </ul>;

export const TagListItem : React.FC<TagData> = ({id, title, articleCount}) => {
    return <li>
        <TagLink id={id} title={title}>
            #{title}
            <span>{articleCount}</span>
        </TagLink>
    </li>
}