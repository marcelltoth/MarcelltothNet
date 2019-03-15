import * as React from 'react';
import styles from './elements.module.scss';

interface HeadingProps{
    level: number;
}

export const Heading : React.FC<HeadingProps> = ({level, children}) => {
    return React.createElement(
        "h"+level,
        {className: styles.heading},
        children
    );
}