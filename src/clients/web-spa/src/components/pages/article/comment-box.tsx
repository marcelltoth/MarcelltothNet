import * as React from 'react';
import Helmet from 'react-helmet';

export class CommentBox extends React.Component{

    render(){
        return <>
        <div id="commento"></div>
        <Helmet>
            <script src="https://cdn.commento.io/js/commento.js"></script>
        </Helmet>
    </>;
    }
}