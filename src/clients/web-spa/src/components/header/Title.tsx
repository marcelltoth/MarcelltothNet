import * as React from 'react';
import styles from './header.module.scss';

export class Title extends React.Component{
    render(){
        return <a href="/" className={styles.titleText}>
            <span>Marcell Toth</span>
            <small>Full stack developer, exploring the world of .NET and friends</small>
        </a>
    }
}