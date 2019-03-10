import * as React from 'react';
import styles from './elements.module.scss';

interface ImageProps{
    src: string;
    alt: string;
}

export const Image : React.FC<ImageProps> = ({src, alt}) => {
    return <img className={styles.img} src={src} alt={alt} />
}