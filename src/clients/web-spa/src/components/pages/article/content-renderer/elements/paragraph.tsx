import * as React from 'react';
import styles from './elements.module.scss';

interface ParagraphProps{}

export const Paragraph: React.FC<ParagraphProps> = ({children}) => {
    return <p className={styles.paragraph}>
        {children}
    </p>;
}