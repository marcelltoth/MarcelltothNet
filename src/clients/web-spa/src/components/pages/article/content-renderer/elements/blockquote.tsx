import * as React from 'react';
import styles from './elements.module.scss';

interface BlockquoteProps{
    children: React.ReactNode;
}


export const Blockquote : React.FC<BlockquoteProps> = ({children}) => {

    return <blockquote className={styles.blockquote}>
        {children}
    </blockquote>
}