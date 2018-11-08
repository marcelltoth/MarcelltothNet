import * as React from 'react';
import styles from './Header.module.scss';

export class SocialLinkPanel extends React.Component{
    render(){
        return <ul className={styles.SocialLinks}>
            {React.Children.map(
                this.props.children, 
                child => <li>{child}</li>
            )}
        </ul>;
    }
}