import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import items from './items';
import services from './services';

export const reducers = combineReducers({ posts, auth , items, services});
