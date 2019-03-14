import * as React from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';

export class Title extends React.Component{
    render(){
        return <Link to="/" className={styles.titleText}>
            <span>Marcell Toth</span>
            <small>Full stack developer, exploring the world of .NET and friends</small>
        </Link>
    }
}