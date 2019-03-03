import * as React from 'react';
import { TopRow } from './TopRow';
import { Menu } from './menu';



export class Header extends React.PureComponent{
    render(){
        return <header>
            <TopRow />
            <Menu />
        </header>;
    }
}