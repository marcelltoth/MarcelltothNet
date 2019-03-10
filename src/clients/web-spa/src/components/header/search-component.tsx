import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

export class SearchComponent extends React.Component{
    public render(){
        return (<a href="#">
            <FontAwesomeIcon icon={faSearch} />
        </a>);
    }
}