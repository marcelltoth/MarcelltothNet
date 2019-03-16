import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import App from './components/app';
import './index.scss';

import * as serviceWorker from './serviceWorker';
import { buildStore } from './store';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

const store = buildStore();

const render = (Component) => {

    const tree = (
        <Provider store={store}>
            <BrowserRouter>
                <Component />
            </BrowserRouter>
        </Provider>
    );

    return ReactDOM.render(tree, document.getElementById('root'));
}

render(App);

if(module.hot){
    module.hot.accept('./components/app', () => {
        const NextApp = require('./components/app').default;
        render(NextApp);
    });
}