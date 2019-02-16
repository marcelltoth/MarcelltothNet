import {createStore as reduxCreateStore, applyMiddleware} from 'redux';
import {rootReducer} from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const middlewarePipeline = [thunk];

const enhancers = composeEnhancers(
    applyMiddleware(...middlewarePipeline)
);

export const createStore = () => {
    return reduxCreateStore(
        rootReducer,
        undefined,
        enhancers
    );
}