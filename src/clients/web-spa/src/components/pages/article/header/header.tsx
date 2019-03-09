import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ArticleMetaList, TagBadge } from '../../common';
import { format } from 'date-fns';
import styles from './header.module.scss';

interface TagData{
    title: string;
    id: number;
}

interface HeaderProps{
    thumbnailImage: string;
    thumbnailAltText: string;
    title: string;
    author: string;
    publishDate: Date;
    tags: TagData[];
}

export const Header : React.FC<HeaderProps> = ({thumbnailImage, thumbnailAltText, title, author, publishDate, tags}) => {
    return (
        <Container>
            <section className={styles["image-container"]}>
                <img src={thumbnailImage} alt={thumbnailAltText} />
                <div className={styles.overlay}>
                    <div className={styles.tags}>
                        {tags.map(t => <TagBadge key={t.id} tag={t} />)}
                    </div>
                    <h1>{title}</h1>
                    <ArticleMetaList className={styles.meta}>
                        <li className="primary">{author}</li>
                        <li>{format(publishDate, 'MMMM D, YYYY')}</li>
                    </ArticleMetaList>
                </div>
            </section>
        </Container>
    )
}