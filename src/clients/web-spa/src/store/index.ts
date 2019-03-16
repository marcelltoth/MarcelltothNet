

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { fetchBasicData } from './actions/basic-data';


export function buildStore(){
    const composeEnhancers = composeWithDevTools({
        actionCreators: {
            fetchBasicData: fetchBasicData
        }
    });
    return createStore(rootReducer, /* preloadedState,*/ composeEnhancers(
        applyMiddleware(thunk)
    ));
}