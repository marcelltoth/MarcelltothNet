import * as React from 'react';
import { TopRow } from './top-row';
import { Menu } from './menu';



export class Header extends React.PureComponent{
    render(){
        return <header>
            <TopRow />
            <Menu />
        </header>;
    }
}