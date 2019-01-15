import * as React from 'react';
import Container from 'reactstrap/lib/Container';
import styles from './Header.module.scss';

export class Menu extends React.Component{
    render(){
        return <Container>
            <ul className={styles.menu}>
                <MenuItem title="Blog">
                    <MenuItem title="Core C#" />
                    <MenuItem title="ASP.NET Core" />
                    <MenuItem title="Optimization, performance" />
                    <MenuItem title="Frontend Dev" />
                    <MenuItem title="Others" />
                </MenuItem>
                <MenuItem title="My story" />
                <MenuItem title="Portfolio">
                    <MenuItem title="Blog" />
                    <MenuItem title="Neptun Lite" />
                </MenuItem>
                <MenuItem title="Contacts" />
            </ul>
        </Container>
    }
}

interface MenuItemProps{
    title: string;
}

class MenuItem extends React.Component<MenuItemProps>{
    render(){
        const {title, children} = this.props;
        const hasDropdown = React.Children.count(children) > 0;
        return <li>
            <a href="#">{title}</a>
            {hasDropdown && <div className={styles.dropdown}>
                <div className={styles.dropdownBody}>
                    <ul>
                        {this.props.children}
                    </ul>
                </div>
            </div>}
        </li>;
    }
}