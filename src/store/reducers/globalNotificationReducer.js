import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    error: null,
    loading: null,
    pagesList: [],
    gridData: {},
    success: false

};
const setNotificationInitialState = (state = {}, action) => {
    console.log("actionnns", action);
    return updateObject(state, {...action.response});
};
const requestStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const requestSuccess = (state, action) => {

    return updateObject(state, {

        response: action.response,
        error: null,
        success: true,
        loading: false
    });
};
const requestFail = (state, action) => {
    return updateObject(state, {

        error: true
    });
};

const requestGridSuccess = (state, action) => {
    console.log("innnnnnn", state);
    return updateObject(state, {
        gridData: action.gridData,

    });
};


const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const globalNotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.NOTIFICATION_REQUEST_START:
            return requestStart(state, action);
        case ActionTypes.NOTIFICATION_REQUEST_SUCCESS:
            return requestSuccess(state, action);
        case ActionTypes.NOTIFICATION_REQUEST_FAIL:
            return requestFail(state, action);
        case ActionTypes.NOTIFICATION_GRID_SUCCESS:
            return requestGridSuccess(state, action);

        case ActionTypes.NOTIFICATION_INITIALIZE_STATE:
            return setNotificationInitialState(state, action);
        default:
            return state;
}
};

export default globalNotificationReducer;
