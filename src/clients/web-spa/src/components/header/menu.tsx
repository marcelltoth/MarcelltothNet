import * as React from 'react';
import Container from 'reactstrap/lib/Container';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';

export class Menu extends React.Component{
    render(){
        return <Container>
            <ul className={styles.menu}>
                <MenuItem title="Blog" target="/">
                    <MenuItem title="Core C#" target="/tag/1/csharp" />
                    <MenuItem title="ASP.NET Core" target="/tag/2/aspnetcore" />
                    <MenuItem title="Optimization, performance" target="/tag/4/performance" />
                    <MenuItem title="Frontend Dev" target="/tag/6/frontend" />
                </MenuItem>
                <MenuItem title="My story" />
                <MenuItem title="Portfolio">
                    <MenuItem title="Blog" />
                    <MenuItem title="Neptun Lite" />
                </MenuItem>
                <MenuItem title="Contact Me" target="/contact" />
            </ul>
        </Container>
    }
}

interface MenuItemProps{
    title: string;
    target?: string;
}

class MenuItem extends React.Component<MenuItemProps>{
    render(){
        const {title, target, children} = this.props;
        const hasDropdown = React.Children.count(children) > 0;
        return <li>
            {target ? <Link to={target}>{title}</Link> : <a href="#">{title}</a>}
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