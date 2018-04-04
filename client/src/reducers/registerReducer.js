import * as types from '../actions/actionsTypes'
import initialState from './initialState'
export default function registerReducer(state = initialState.users, action) {
    console.log('loginReducers state', action);
    switch (action.type) {
        case types.CREATE_USER:
            return action.user
        case types.CREATE_USER_SUCCESS:
            return Object.assign({}, state, action.user)
        default:
            return state;
    }
}