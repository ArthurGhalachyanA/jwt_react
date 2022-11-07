import {createStore, combineReducers, applyMiddleware} from 'redux'
import {userReducer} from './reducers/userReducer';
import {workspaceReducer} from './reducers/workspaceReducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    userReducer,
    workspaceReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));