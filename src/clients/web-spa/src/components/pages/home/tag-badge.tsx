import * as React from 'react';
import { TagLink } from "../../common";
import styles from './home.module.scss';
import classNames from 'classnames';

interface TagData{
    title: string;
    id: number;
}

interface TagBadgeProps{
    tag: TagData;
    className?: string;
}

export const TagBadge : React.FC<TagBadgeProps> = ({tag: {title, id}, className}) => {
    return (
        <TagLink id={id} title={title} className={classNames("badge badge-danger", styles["tag-badge"], className)}>#{title.toLocaleLowerCase()}</TagLink>
    )
}