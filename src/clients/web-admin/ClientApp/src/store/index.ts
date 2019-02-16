import {createStore as reduxCreateStore} from 'redux';
import {rootReducer} from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export const createStore = () => {
    return reduxCreateStore(
        rootReducer,
        undefined,
        composeEnhancers()
    );
}