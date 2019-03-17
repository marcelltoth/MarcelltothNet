import * as React from 'react';
import styles from './tag-list.module.scss';
import { TagLink } from '../../links';

interface TagData{
    id: number;
    displayName: string;
    articleCount: number;
}

export const TagList : React.FC = ({children}) => 
    <ul className={styles['tag-list']}>
        {children}
    </ul>;

export const TagListItem : React.FC<TagData> = ({id, displayName, articleCount}) => {
    return <li>
        <TagLink id={id} title={displayName}>
            #{displayName}
            <span>{articleCount}</span>
        </TagLink>
    </li>
}