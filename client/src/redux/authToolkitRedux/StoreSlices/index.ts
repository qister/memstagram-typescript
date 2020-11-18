import { combineReducers } from 'redux';

import authorization from './authorization';


export const reducers = combineReducers({
    authorization,
});

export type RootState = ReturnType<typeof reducers>;
