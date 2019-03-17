import * as React from 'react';
import { TagLink } from "./links";
import styles from './common.module.scss';
import classNames from 'classnames';

interface TagData{
    displayName: string;
    id: number;
}

interface TagBadgeProps{
    tag: TagData;
    className?: string;
}

export const TagBadge : React.FC<TagBadgeProps> = ({tag: {displayName, id}, className}) => {
    return (
        <TagLink id={id} title={displayName} className={classNames("badge badge-danger", styles["tag-badge"], className)}>#{displayName.toLocaleLowerCase()}</TagLink>
    )
}