import * as React from 'react';
import { TopRow } from './TopRow';

export class Header extends React.PureComponent{
    render(){
        return <header>
            <TopRow />
        </header>;
    }
}