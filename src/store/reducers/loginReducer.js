import * as ActionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/admin/dashboard',
    isAuthenticated: localStorage.getItem('jwtToken') !== null,
    hasError: false,
    errorMessage: "",
     dynamicData: [],
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        isAuthenticated: action.isAuthenticated,
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

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        isAuthenticated: localStorage.getItem('jwtToken') !== null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
};

const dashboard = (state, action) => {
    return updateObject(state, {
       dynamicData : action.dashboardData
    });
    
        
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_START:
            return authStart(state, action);
        case ActionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case ActionTypes.AUTH_FAIL:
            return authFail(state, action);
        case ActionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case ActionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
            case ActionTypes.DASHBOARD_SUCCESS:
            return dashboard(state, action);
            
        default:
            return state;
    }
};

export default loginReducer;
