import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import './index.scss';

import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


const render = (Component) => {

    const tree = (
        <BrowserRouter>
            <Component />
        </BrowserRouter>
    );

    return ReactDOM.render(tree, document.getElementById('root'));
}

render(App);

if(module.hot){
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}