import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducers } from './StoreSlices';
import logger from './middleware/logger';
import monitorReducerEnhancer from './enhancers/monitorReducer';

export default function configureStore(): any {
    const middlewares = [logger, thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
    // @ts-ignore
    const composedEnhancers = composeWithDevTools(...enhancers);

    // eslint-disable-next-line no-undefined
    return createStore(reducers, undefined, composedEnhancers);
}
