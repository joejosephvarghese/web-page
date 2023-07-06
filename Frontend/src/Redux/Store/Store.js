import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import usersReducer from '../users/usersReducer';
import adminUsersReducer from '../admin/admin';

const combinedReducers = combineReducers({
    users: usersReducer,
    admin: adminUsersReducer,
})

const store = createStore(
    combinedReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;