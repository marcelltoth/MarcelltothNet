import * as React from 'react';
import styles from './article-meta-list.module.scss';
import classNames from 'classnames';

interface ArticleMetaListProps{
    className?: string;
}

export const ArticleMetaList : React.FC<ArticleMetaListProps> = ({className, children}) => {
    return <ul className={classNames(styles.meta,className)}>
        {children}
    </ul>
}