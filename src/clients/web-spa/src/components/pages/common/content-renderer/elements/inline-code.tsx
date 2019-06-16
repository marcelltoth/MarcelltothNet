import * as React from 'react';
import styles from './elements.module.scss';

export const InlineCode : React.FC = ({children}) => {
    return <code className={styles['inline-code']}>{children}</code>;
}