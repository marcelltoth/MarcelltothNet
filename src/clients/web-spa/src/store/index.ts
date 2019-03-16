

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';


export function buildStore(){
    const composeEnhancers = composeWithDevTools({
        // dev tools options
    });
    const store = createStore(rootReducer, /* preloadedState,*/ composeEnhancers(
        applyMiddleware(thunk)
    ));
}