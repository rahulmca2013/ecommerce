import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    error: null, 
    loading: null,
    matchPlayedList: []
};

const requestStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const requestSuccess = (state, action) => {
    return updateObject(state, {
        matchPlayedList: action.matchPlayedList,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};




const matchPlayedReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.MATCH_PLAYED_REQUEST_START:
            return requestStart(state, action);
        case ActionTypes.MATCH_PLAYED_REQUEST_SUCCESS:
            return requestSuccess(state, action);
        case ActionTypes.MATCH_PLAYED_REQUEST_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
};

export default matchPlayedReducer;
