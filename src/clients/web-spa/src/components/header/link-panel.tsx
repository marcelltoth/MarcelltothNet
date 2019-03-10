import * as React from 'react';
import styles from './header.module.scss';

export class LinkPanel extends React.Component{
    render(){
        return <ul className={styles.LinkPanel}>
            {React.Children.map(
                this.props.children, 
                child => <li>{child}</li>
            )}
        </ul>;
    }
}