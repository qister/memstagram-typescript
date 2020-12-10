import { combineReducers } from 'redux';

import authorization from './authorization';
import app from './app';


export const reducers = combineReducers({
    authorization, app
});

export type RootState = ReturnType<typeof reducers>;
