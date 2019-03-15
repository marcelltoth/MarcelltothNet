import * as React from 'react';
import styles from './elements.module.scss';

interface ListProps{
    ordered: boolean;
}

export const List : React.FC<ListProps> = ({ordered, children}) => {
    if(ordered){
        return <ol className={styles.ol}>
            {children}
        </ol>;
    }
    else{
        return <ul className={styles.ul}>
            {children}
        </ul>;
    }
}

export const ListItem : React.FC = ({children}) => {
    return <li>
        {children}
    </li>;
}